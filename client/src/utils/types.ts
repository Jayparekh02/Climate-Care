export interface RegistrationFormData {
  [key: string]: string;
  _id: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  countryCode: string;
  gender: "male" | "female" | "other";
  userType: "general" | "ngo";
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface CountryCodes {
  id: string;
  label: string;
  value: string;
}

export interface StepperFormData {
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

// src/types.ts
export interface EventFormType {
  _id?: string;
  title: string;
  category: string;
  date: string;
  location: string;
  description: string;
}
export interface IResource {
  //_id: string;
  title: string;
  description: string;
  resourceType: "article" | "video";
  resourceLink: string;
  imageUrl?: string;
}
export interface ResourceState {
  articles: IResource[];
  videos: IResource[];
  error: string | null;
  loading: boolean;
}
