export interface Emission {
  userId?: string; // Assuming userId is a string
  transportation: {
    distanceTraveledDaily?: number;
    transportType?: string;
    vehicleType?: string;
    carpooling?: string;
    telecommutingFrequency?: string;
  };
  foodDiet: {
    dietType?: string;
    mealsContainingMeatPerWeek?: number;
    percentageLocallySourced?: number;
    prefersOrganic?: boolean;
  };
  homeEnergy: {
    monthlyKwhUsage?: number;
    heatingCoolingType?: string;
    usesRenewableEnergy?: boolean;
    appliancesEnergyEfficient?: boolean;
  };
  wasteRecycling: {
    weeklyWasteGeneratedKg?: number;
    recyclesRegularly?: boolean;
    compostsOrganicWaste?: boolean;
  };
  emissionScore?: number;
}
