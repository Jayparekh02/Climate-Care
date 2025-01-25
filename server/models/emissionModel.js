import mongoose from "mongoose";

const emissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    transportation: {
      distanceTraveledDaily: Number,
      transportType: String,
      vehicleType: String,
      carpooling: String,
      telecommutingFrequency: String,
    },
    foodDiet: {
      dietType: String,
      mealsContainingMeatPerWeek: Number,
      percentageLocallySourced: Number,
      prefersOrganic: Boolean,
    },
    homeEnergy: {
      monthlyKwhUsage: Number,
      heatingCoolingType: String,
      usesRenewableEnergy: Boolean,
      appliancesEnergyEfficient: Boolean,
    },
    wasteRecycling: {
      weeklyWasteGeneratedKg: Number,
      recyclesRegularly: Boolean,
      compostsOrganicWaste: Boolean,
    },
    emissionScore: Number, // calculated field
  },
  {
    timestamps: true, // Enable automatic timestamping
  }
);

export default mongoose.model("Emission", emissionSchema);
