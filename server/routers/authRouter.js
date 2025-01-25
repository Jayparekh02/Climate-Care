// routers/authRouter.js
import express from "express";
import { body } from "express-validator";
import * as AuthController from "../controllers/authController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/register",
  [body("email").isEmail(), body("password").isLength({ min: 6 })],
  AuthController.register
);

router.post("/login", AuthController.login);
router.post("/forgot-password", AuthController.forgotPassword);
router.post("/reset-password", AuthController.resetPassword);

router.get("/protected-route", authenticateToken, (req, res) => {
  res.send("This is a protected route");
});

export default router;
