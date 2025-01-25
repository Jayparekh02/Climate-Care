export function calculateEmissionScore(emissionData) {
  const transportationEmissions = calculateTransportationEmissions(
    emissionData.transportation
  );
  const foodDietEmissions = calculateFoodDietEmissions(emissionData.foodDiet);
  const homeEnergyEmissions = calculateHomeEnergyEmissions(
    emissionData.homeEnergy
  );
  const wasteRecyclingEmissions = calculateWasteRecyclingEmissions(
    emissionData.wasteRecycling
  );
  const totalEmissionScore =
    transportationEmissions +
    foodDietEmissions +
    homeEnergyEmissions +
    wasteRecyclingEmissions;

  // Normalize the total score to a range between 70 and 100
  const normalizedScore = Math.max(70, Math.min(100, totalEmissionScore));
  return normalizedScore;
}

// Function to calculate transportation emissions
const calculateTransportationEmissions = (transportationData) => {
  const {
    vehicleType,
    distanceTraveledDaily,
    telecommutingFrequency,
    carpooling,
    transportType,
  } = transportationData;

  let emissions = 0;

  // Assign emissions based on vehicle type
  switch (transportType) {
    case "Public":
      // Assign emissions for public transportation (in grams of CO2 per km traveled)
      emissions = 30; // Example value for public transportation
      break;
    case "Private":
      switch (vehicleType) {
        case "electric":
          // Assign emissions for electric vehicles (in grams of CO2 per km traveled)
          emissions = 0; // Assuming electric vehicles have zero emissions
          break;
        case "gasoline":
          // Assign emissions for gasoline vehicles (in grams of CO2 per km traveled)
          emissions = 120; // Example value for gasoline vehicles
          break;
        default:
          emissions = 0;
          break;
      }
      break;
    default:
      emissions = 0;
      break;
  }
  // Adjust emissions based on carpooling frequency
  if (carpooling === "carpool") {
    emissions -= 10; // Example reduction for frequent carpooling
  } else if (carpooling === "driveAlone") {
    emissions += 5; // Example reduction for occasional carpooling
  }

  switch (telecommutingFrequency) {
    case "Never":
      // No reduction for never telecommuting
      break;
    case "Sometimes":
      emissions -= 5; // Example reduction for sometimes telecommuting
      break;
    case "Often":
      emissions -= 10; // Example reduction for often telecommuting
      break;
    case "Always":
      emissions -= 20; // Example reduction for always telecommuting
      break;
    default:
      // Handle unknown telecommuting frequency
      break;
  }

  // Calculate total emissions based on distance traveled and fuel efficiency
  const totalEmissions = emissions * distanceTraveledDaily;

  return totalEmissions;
};

// Function to calculate food and diet emissions
const calculateFoodDietEmissions = (foodDietData) => {
  const { dietType, mealsContainingMeatPerWeek, prefersOrganic } = foodDietData;

  let emissions = 0;

  // Assign emissions based on diet type
  switch (dietType) {
    case "Omnivore":
      emissions += 30; // Example emissions for omnivorous diet (arbitrary value)
      break;
    case "Vegetarian":
      emissions += 20; // Example emissions for vegetarian diet (arbitrary value)
      break;
    case "Vegan":
      emissions += 10; // Example emissions for vegan diet (arbitrary value)
      break;
    default:
      emissions += 30; // Default to omnivorous diet emissions if diet type is not specified
      break;
  }

  // Adjust emissions based on meals containing meat per week
  emissions += mealsContainingMeatPerWeek * 5; // Example emissions for each meat-containing meal (arbitrary value)

  // Adjust emissions based on preference for organic food
  if (prefersOrganic) {
    emissions -= 10; // Example emissions reduction for preferring organic food (arbitrary value)
  }

  return emissions;
};

// Function to calculate home energy emissions
const calculateHomeEnergyEmissions = (homeEnergyData) => {
  const {
    monthlyKwhUsage,
    heatingCoolingType,
    usesRenewableEnergy,
    appliancesEnergyEfficient,
  } = homeEnergyData;

  let emissions = 0;

  // Assign emissions based on monthly kWh usage
  emissions += monthlyKwhUsage * 0.5; // Example emissions for each kWh consumed (arbitrary value)

  // Adjust emissions based on heating/cooling system type
  switch (heatingCoolingType) {
    case "Central":
      // Additional emissions for central air/heating (arbitrary value)
      emissions += 50;
      break;
    case "Window":
      // Additional emissions for window units (arbitrary value)
      emissions += 30;
      break;
    case "Other":
      // Additional emissions for other types of systems (arbitrary value)
      emissions += 40;
      break;
    default:
      break;
  }

  // Adjust emissions based on renewable energy usage
  if (usesRenewableEnergy) {
    emissions -= 20; // Example emissions reduction for using renewable energy (arbitrary value)
  }

  // Adjust emissions based on energy efficiency of appliances
  if (appliancesEnergyEfficient) {
    emissions -= 10; // Example emissions reduction for using energy-efficient appliances (arbitrary value)
  }
  return emissions;
};

// Function to calculate waste and recycling emissions
const calculateWasteRecyclingEmissions = (wasteRecyclingData) => {
  const { weeklyWasteGeneratedKg, recyclesRegularly, compostsOrganicWaste } =
    wasteRecyclingData;

  let emissions = 0;

  // Assign emissions based on weekly waste generated
  emissions += weeklyWasteGeneratedKg * 2; // Example emissions for each kg of waste generated

  // Adjust emissions based on regular recycling
  if (recyclesRegularly) {
    emissions -= 20; // Example emissions reduction for regular recycling
  }

  // Adjust emissions based on composting organic waste
  if (compostsOrganicWaste) {
    emissions -= 10; // Example emissions reduction for composting organic waste
  }

  return emissions;
};
