import { Request } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";
import emailTemplates from "../emailTemplates/emailTemplates";
import { badRequestError } from "../error";
import logger from "../logger";
import User from "../models/user";
import { generateVerificationLink } from "../utils/generateVerificationLink";
import Helpers from "../utils/helper";
import { client } from "../utils/redis";
import sqs from "../utils/sqs-consumer";
import TermiiService from "../utils/termii";

export default class UserService {
  private termiiService = new TermiiService();

  async sendEmailVerificationLink(userId: string) {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    if (user.isEmailVerified) {
      throw new Error("Email already verified");
    }

    const verificationLink = await generateVerificationLink(userId);

    const msgData = {
      notifyBy: ["email"],
      email: user.email,
      subject: "Verify Your Email Address",
      data: {
        token: verificationLink,
        name: `${user.userName}`,
      },
      template: emailTemplates.confirmEmail,
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

    try {
      const data = await sqs.sendMessage(sqsOrderData).promise();
      logger.info(`Email Verification Link sent | SUCCESS: ${data.MessageId}`);
    } catch (error) {
      logger.error(`Error sending Verification Link email: ${error.message}`);
    }
  }

  async verifyEmail(req: Request) {
    const { token } = req.query;

    const decodedToken = Buffer.from(token as string, "base64").toString(
      "ascii"
    );

    const { userId } = jwt.verify(
      decodedToken,
      config.jwtSecret as string
    ) as any;

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    if (user.isEmailVerified) {
      throw new Error("Email already verified");
    }

    const verificationToken = await client.get(`email_verification_${userId}`);
    if (!verificationToken || verificationToken !== token) {
      throw new Error("Link expired or incorrect");
    }

    await user.updateOne({ isEmailVerified: true });
    await client.del(`email_verification_${userId}`);

    const msgData = {
      notifyBy: ["email"],
      email: user.email,
      subject: "Email Verification Successful",
      data: {
        name: user.userName,
      },
      template: emailTemplates.verifiedEmailSuccess,
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

    await sqs.sendMessage(sqsOrderData).promise();

    logger.info("Email Verified sent | SUCCESS");

    return {
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
      },
    };
  }

  async sendPhoneVerificationCode(userId: string) {
    const user = await User.findById(userId);

    if (!user) {
      throw badRequestError("User not found");
    }

    if (user.isPhoneVerified) {
      throw new Error("Phone already verified");
    }

    const otp = Helpers.generateOtp();

    const message = `Please, confirm your registered phone number on Brillo with this code ${otp}`;

    await client.set(`phone_verification_${userId}`, otp, "EX", 300);

    await this.termiiService.sendSms({
      phone: Helpers.formatNumber("234", user.phone),
      message,
    });

    return process.env.NODE_ENV !== "production" ? { otp } : undefined;
  }

  async verifyPhone(userId: string, token: string) {
    const user = await User.findById(userId);

    if (!user) {
      throw badRequestError("User not found");
    }

    if (user.isPhoneVerified) {
      throw badRequestError("Phone Already Verified");
    }

    const otp = await client.get(`phone_verification_${userId}`);

    if (!otp) {
      throw badRequestError("Incorrect Otp or expired");
    }

    if (otp !== token) {
      throw badRequestError("Incorrect Otp");
    }

    await user.updateOne({
      isPhoneVerified: true,
    });

    await client.del(`phone_verification_${userId}`);
  }
  

}
