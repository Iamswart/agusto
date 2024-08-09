import jwt from "jsonwebtoken";
import { Schema, model, Document, Types } from "mongoose";
import bcrypt from "bcrypt";
import config from "../config/config";

interface IUserDocument extends Document {
  generateAuthToken(expirationTime?: string): string;
  generateRefreshToken(): string;
}

interface IUser extends IUserDocument {
  _id: Types.ObjectId;
  userName: string;
  email: string;
  phone: string;
  password: string;
  gender?: "Male" | "Female" | "others";
  isAdmin?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  lastLoginAt?: Date;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
}

const userSchema = new Schema<IUser>({
  userName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8, maxlength: 1024 },
  gender: { type: String, enum: ["Male", "Female", "others"] },
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  lastLoginAt: { type: Date, default: Date.now },
  isEmailVerified: { type: Boolean, default: false },
  isPhoneVerified: { type: Boolean, default: false },
});

userSchema.methods.generateAuthToken = function (expirationTime?: string) {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.jwtSecret as string,
    { expiresIn: expirationTime || config.jwtExpiration }
  );
  return token;
};

userSchema.methods.generateRefreshToken = function () {
  const refreshToken = jwt.sign(
    { _id: this._id },
    config.refreshTokenSecret as string,
    { expiresIn: config.refreshTokenExpiration }
  );

  return refreshToken;
};

userSchema.pre<IUser>("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

const User = model<IUser>("User", userSchema);

export default User;
