// services/authService.js
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
// import nodemailer from "nodemailer";
import { generateToken, verifyToken } from "./jwtService.js";
import pino from "pino";

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: { colorize: true },
  },
});
export const register = async (userData) => {
  try {
    return await User.create(userData);
  } catch (error) {
    logger.error(error);
    throw new Error("Error registering user");
  }
};

export const login = async (credentials) => {
  const { email, password } = credentials;
  const user = await User.findOne({ email });

  if (!user) {
    logger.error("User not found!");
    throw new Error("User not found");
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw new Error("Invalid password");
  }

  const token = generateToken(user);
  return { user, token };
};

export const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    throw new Error("Error finding user by email");
  }
};

export const forgotPassword = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  // Generate password reset token
  const token = generateToken(user._id);

  // Send email with password reset link
  // sendPasswordResetEmail(user.email, token);
};

// export const resetPassword = async (token, newPassword) => {
//   const decoded = verifyToken(token);
//   const user = await User.findById(decoded.userId);

//   if (!user) {
//     throw new Error("Invalid token");
//   }

//   const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
//   user.password = hashedPassword;
//   await user.save();
// };

// const sendPasswordResetEmail = async (email, token) => {
//   // Configure nodemailer to send email
//   const transporter = nodemailer.createTransport({
//     // Configure your email service
//   });

//   // Send email
//   await transporter.sendMail({
//     from: "your_email@example.com",
//     to: email,
//     subject: "Password Reset",
//     text: `Click the following link to reset your password: http://example.com/reset-password?token=${token}`,
//   });
// };
