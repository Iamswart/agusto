import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";
import config from "../config/config";
import emailTemplates from "../emailTemplates/emailTemplates";
import { badRequestError } from "../error";
import {
  ChangePasswordInterface,
  LoginInterface,
  RegisterInterface
} from "../interfaces/auth";
import logger from "../logger";
import User from "../models/user";
import {
  generatePasswordResetLink,
  generateVerificationLink,
} from "../utils/generateVerificationLink";
import { client } from "../utils/redis";
import sqs from "../utils/sqs-consumer";

export default class AuthService {
  async register(input: RegisterInterface) {
    const { userName, email, password, phone } = input;

    const emailExist = await User.findOne({ email: email });
    if (emailExist) {
      throw badRequestError(
        "Email address already exist, please login to continue"
      );
    }

    const userNameExist = await User.findOne({ userName: userName });
    if (userNameExist) {
      throw badRequestError("UserName already exist");
    }

    const phoneExist = await User.findOne({ phone: phone });
    if (phoneExist) {
      throw badRequestError("Phone Number already exist");
    }

    const user = await User.create({
      userName,
      email,
      phone,
      password,
    });

    const welcomeMsgData = {
      notifyBy: ["email"],
      email: user.email,
      subject: "Welcome",
      data: {
        name: `${user.userName}`,
      },
      template: emailTemplates.welcome,
    };

    const welcomeSqsOrderData = {
      MessageAttributes: {
        type: {
          DataType: "String",
          StringValue: "email",
        },
      },
      MessageBody: JSON.stringify(welcomeMsgData),
      QueueUrl: process.env.SQS_QUEUE_URL as string,
    };

    const welcomeSqsMessagePromise = sqs
      .sendMessage(welcomeSqsOrderData)
      .promise();
    welcomeSqsMessagePromise
      .then((data) => {
        logger.info(`Welcome Email sent | SUCCESS: ${data.MessageId}`);
      })
      .catch((error) => {
        logger.error(`Error sending Welcome email: ${error}`); 
      });

    const accessToken = user.generateAuthToken();
    const refreshToken = user.generateRefreshToken();
    await client.set(`refreshToken_${user.id}`, refreshToken,  "EX", 604800 );
    return {
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin,
      },
      accessToken,
      refreshToken,
    };
  }

  async login(input: LoginInterface) {
    const { email, phone, password } = input;

    let loginCriteria = {};
    if (email) {
      loginCriteria = { email };
    } else if (phone) {
      loginCriteria = { phone };
    } else {
      throw badRequestError("Login method not provided");
    }

    const user = await User.findOne(loginCriteria);
    if (!user) {
      throw badRequestError("Email/Phone or Password Incorrect");
    }

    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
      throw badRequestError("Email/Phone or Password Incorrect");
    }

    const accessToken = user.generateAuthToken();
    const refreshToken = user.generateRefreshToken();

    await client.set(`refreshToken_${user.id}`, refreshToken,  "EX", 604800 );

    user.lastLoginAt = new Date();
    await user.save();

    return {
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin,
      },
      accessToken,
      refreshToken,
    };
  }

  async changePassword(input: ChangePasswordInterface, userId: string) {
    const { oldPassword, newPassword } = input;

    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw badRequestError("User not found");
    }

    const verifyCredentials = await bcrypt.compare(
      oldPassword,
      user.password as string
    );
    if (!verifyCredentials) {
      throw badRequestError("Incorrect current password");
    }

    const isPasswordDifferent = await bcrypt.compare(
      newPassword,
      user.password as string
    );
    if (isPasswordDifferent) {
      throw badRequestError(
        "New password must be different from previous password"
      );
    }

    user.password = newPassword;
    await user.save();

    const CHANGE_PASSWORD_TEMPLATE = emailTemplates.changePasswordSuccess;

    const msgData = {
      notifyBy: ["email"],
      email: user.email,
      subject: "Change Password",
      data: {
        name: `${user.userName}`,
      },

      template: CHANGE_PASSWORD_TEMPLATE,
    };

    const sqsOrderData = {
      MessageAttributes: {
        type: {
          DataType: "String",
          StringValue: "email",
        },
      },
      MessageBody: JSON.stringify(msgData),
      QueueUrl: process.env.SQS_QUEUE_URL as string,
    };

    const sendSqsMessage = sqs.sendMessage(sqsOrderData).promise();

    sendSqsMessage.then((data) => {
      logger.info(`Change Email sent | SUCCESS: ${data.MessageId}`);
    });
  }

  async forgotPassword(email: string) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error(
        "If the email you entered is registered with us, you will receive a password reset email shortly. Please check your inbox and follow the instructions. If you don't receive an email, please check your spam folder."
      );
    }
    const resetLink = await generatePasswordResetLink(user._id.toString());

    const FORGOT_PASSWORD_TEMPLATE = emailTemplates.forgotPassword;

    const msgData = {
      notifyBy: ["email"],
      email: email,
      subject: "Reset Your Password",
      data: {
        token: resetLink,
        name: `${user.userName}`,
      },

      template: FORGOT_PASSWORD_TEMPLATE,
    };

    const sqsOrderData = {
      MessageAttributes: {
        type: {
          DataType: "String",
          StringValue: "email",
        },
      },
      MessageBody: JSON.stringify(msgData),
      QueueUrl: process.env.SQS_QUEUE_URL as string,
    };

    const sendSqsMessage = sqs.sendMessage(sqsOrderData).promise();

    sendSqsMessage.then((data) => {
      logger.info(`Forgot password Email sent | SUCCESS: ${data.MessageId}`);
    });

    return process.env.NODE_ENV !== "production" ? { resetLink } : undefined;
  }

  async resetUserPassword(token: string, newPassword: string) {
    const decodedToken = Buffer.from(token, "base64").toString("ascii");
    const { userId } = jwt.verify(
      decodedToken,
      config.jwtSecret as string
    ) as any;

    const isValid = await client.get(`password_reset_${userId}`);
    if (!isValid) {
      throw new Error("Invalid or expired reset token");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    user.password = newPassword;
    await user.save();

    const RESET_PASSWORD_TEMPLATE = emailTemplates.changePasswordSuccess;

    const msgData = {
      notifyBy: ["email"],
      email: user.email,
      subject: "Reset Password Successful",
      data: {
        name: `${user.userName}`,
      },
      template: RESET_PASSWORD_TEMPLATE,
    };

    const sqsOrderData = {
      MessageAttributes: {
        type: {
          DataType: "String",
          StringValue: "email",
        },
      },
      MessageBody: JSON.stringify(msgData),
      QueueUrl: process.env.SQS_QUEUE_URL as string,
    };

    const sendSqsMessage = sqs.sendMessage(sqsOrderData).promise();

    sendSqsMessage.then((data) => {
      logger.info(`Change password Email sent | SUCCESS: ${data.MessageId}`);
    });

    await client.del(`password_reset_${userId}`);

    return { success: true };
  }


  async refreshTokenUser(refreshToken: string) {
    const decoded: any = jwt.verify(
      refreshToken,
      config.refreshTokenSecret as string
    );

    const token = await client.get(`refreshToken_${decoded.id}`);

    if (!token) {
      throw badRequestError(
        "Token already expired, please kindly log in again"
      );
    }

    if (token !== refreshToken) {
      throw badRequestError("Incorrect refresh token");
    }

    const accessToken = jwt.sign(
      { id: decoded.id },
      config.jwtSecret as string,
      {
        expiresIn: config.jwtExpiration,
      }
    );

    const newRefreshToken = jwt.sign(
      { id: decoded.id },
      config.refreshTokenSecret as string,

      {
        expiresIn: config.refreshTokenExpiration,
      }
    );

    await client.set(
      `refreshToken_${decoded.id}`,
      newRefreshToken,
      "EX",
      604800
    );

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }
}
