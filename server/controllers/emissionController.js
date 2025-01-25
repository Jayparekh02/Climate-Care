import {
  getLatestEmissionByUserId,
  saveEmissionData,
} from "../services/emissionService.js";
import pino from "pino";

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: { colorize: true },
  },
});

export const calculateEmission = async (req, res) => {
  const { userId, transportation, foodDiet, homeEnergy, wasteRecycling } =
    req.body;

  try {
    const emissionData = {
      userId,
      transportation,
      foodDiet,
      homeEnergy,
      wasteRecycling,
    };
    const savedEmission = await saveEmissionData(emissionData);
    logger.info("Emission data saved successfully");
    res.status(201).send("Emission data saved successfully");
  } catch (error) {
    logger.error(error);
    res.status(400).send(error);
  }
};

export const getEmissionData = async (req, res) => {
  const userId = req.params.userId; // Ensure your authentication middleware sets req.user

  try {
    const emissionData = await getLatestEmissionByUserId(userId);
    if (emissionData) {
      res
        .status(200)
        .json({ message: "Emission data fetched", history: emissionData });
    } else {
      logger.error("No emission data found for the user.");
      res.status(404).send("No emission data found for the user.");
    }
  } catch (error) {
    logger.error(error);
    res.status(500).send("Server error");
  }
};
