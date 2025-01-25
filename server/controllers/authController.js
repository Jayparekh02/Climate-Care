// controllers/authController.js
import * as AuthService from "../services/authService.js";
import { validationResult } from "express-validator";
import pino from "pino";

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: { colorize: true },
  },
});

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;
    const existingUser = await AuthService.findUserByEmail(email);
    if (existingUser) {
      logger.info("User already exists");
      return res.status(400).json({ message: "Email already registered" });
    }

    const user = await AuthService.register(req.body);
    // Send verification email here
    res.status(201).json({
      message: "User registered successfully. Please verify your email.",
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Error registering user" });
  }
};

export const login = async (req, res) => {
  try {
    const { user, token } = await AuthService.login(req.body);
    res
      .status(200)
      .json({ message: "Login Successfull", user: user, token: token });
  } catch (error) {
    logger.error(error);
    res.status(401).json({ message: "Invalid credentials" });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    await AuthService.forgotPassword(req.body.email);
    res.status(200).send("Password reset instructions sent to your email.");
  } catch (error) {
    logger.error(error);
    res.status(500).send("Error processing forgot password request");
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    await AuthService.resetPassword(token, newPassword);
    res.status(200).send("Password reset successful");
  } catch (error) {
    logger.error(error);
    res.status(500).send("Error resetting password");
  }
};
