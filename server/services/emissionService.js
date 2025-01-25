import { calculateEmission } from "../controllers/emissionController.js";
import Emission from "../models/emissionModel.js";
import { calculateEmissionScore } from "../utils.js";

export const saveEmissionData = async (emissionData) => {
  try {
    let emissionScore = calculateEmissionScore(emissionData);
    const newEmission = new Emission({
      ...emissionData,
      emissionScore: emissionScore,
    });
    await newEmission.save();
    return newEmission;
  } catch (error) {
    throw error;
  }
};

export const getLatestEmissionByUserId = async (userId) => {
  try {
    const emissionData = await Emission.find({ userId }).sort({ _id: -1 });
    return emissionData;
  } catch (error) {
    throw error;
  }
};
