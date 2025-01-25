import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import eventRoutes from "./routers/eventRouter.js";
import resourceRoutes from "./routers/resourceRoutes.js";
import authRouter from "./routers/authRouter.js";
import emissionRoutes from "./routers/emissionRouter.js";
import pino from "pino";
import cors from "cors";

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: { colorize: true },
  },
});
// Initialize dotenv to use environment variables
dotenv.config();
// Create an express application
const app = express();
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

await connectDB();

const PORT = process.env.PORT || 5000;
//app.use('/event', eventRoutes);

// Define routes
app.use("/", authRouter);
app.use("/events", eventRoutes);
app.use("/resources", resourceRoutes);
app.use("/emission", emissionRoutes);
app.use("/resources", resourceRoutes);

// Start the server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
