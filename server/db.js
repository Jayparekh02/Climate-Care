// db.js
import mongoose from "mongoose";
import pino from "pino";

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: { colorize: true },
  },
});

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  try {
    await mongoose.connect(uri, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    logger.info("MongoDB connected");
  } catch (err) {
    // Exit process with failure
    logger.error("MongoDB connection failed", err);
    process.exit(1);
  }
};

export default connectDB;
