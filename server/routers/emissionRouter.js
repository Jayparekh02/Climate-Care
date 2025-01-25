import express from "express";
const router = express.Router();
import {
  getEmissionData,
  calculateEmission,
} from "../controllers/emissionController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

// Route to get the latest emission data for a user
router.post("/calculate-emission", calculateEmission);
router.get("/emission-data/:userId", getEmissionData);

export default router;
