import { CountryCodes } from "./types";

export const COUNTRY_CODES: CountryCodes[] = [
  { id: "US", label: "USA (+1)", value: "+1" },
  { id: "GB", label: "UK (+44)", value: "+44" },
  { id: "AU", label: "AUS (+61)", value: "+61" },
  { id: "DE", label: "GER (+49)", value: "+49" },
  { id: "FR", label: "FR (+33)", value: "+33" },
  { id: "IND", label: "IND (+91)", value: "+91" },
];

export const textInputs = [
  { id: 1, name: "name", label: "Full Name", type: "text" },
  { id: 2, name: "email", label: "Email", type: "email" },
  { id: 3, name: "password", label: "Password", type: "password" },
  {
    id: 4,
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
  },
  { id: 5, name: "dateOfBirth", label: null, type: "date" },
];

export const radioInputs = [
  {
    id: 1,
    name: "gender",
    label: "Gender",
    options: [
      { value: "female", label: "Female" },
      { value: "male", label: "Male" },
      { value: "other", label: "Other" },
    ],
    defaultValue: "female", // Default selected value
  },
  {
    id: 2,
    name: "userType",
    label: "User Type",
    options: [
      { value: "general", label: "General User" },
      { value: "ngo", label: "NGO" },
    ],
    defaultValue: "generalUser", // Default selected value
  },
];

export const navItems = ["Home", "About", "Dashboard", "Calculator"];
interface CountryEmissionData {
  year: number;
  [key: string]: number | undefined; // Allows indexing with any string to get a number
}
export const countryEmissionData: CountryEmissionData[] = [
  {
    year: 2010,
    USA: 6.7,
    China: 10.2,
    India: 2.8,
    Russia: 1.7,
    Brazil: 1.0,
    UK: 1.8,
    France: 1.1,
  },
  {
    year: 2011,
    USA: 6.5,
    China: 10.5,
    India: 2.9,
    Russia: 1.8,
    Brazil: 1.1,
    UK: 1.7,
    France: 1.0,
  },
  {
    year: 2012,
    USA: 6.3,
    China: 10.7,
    India: 3.0,
    Russia: 1.9,
    Brazil: 1.2,
    UK: 1.6,
    France: 0.9,
  },
  {
    year: 2013,
    USA: 6.1,
    China: 11.0,
    India: 3.1,
    Russia: 2.0,
    Brazil: 1.3,
    UK: 1.5,
    France: 0.8,
  },
  {
    year: 2014,
    USA: 5.9,
    China: 11.2,
    India: 3.2,
    Russia: 2.1,
    Brazil: 1.4,
    UK: 1.4,
    France: 0.7,
  },
  {
    year: 2015,
    USA: 5.7,
    China: 11.5,
    India: 3.3,
    Russia: 2.2,
    Brazil: 1.5,
    UK: 1.3,
    France: 0.6,
  },
  {
    year: 2016,
    USA: 5.5,
    China: 11.7,
    India: 3.4,
    Russia: 2.3,
    Brazil: 1.6,
    UK: 1.2,
    France: 0.5,
  },
  {
    year: 2017,
    USA: 5.3,
    China: 12.0,
    India: 3.5,
    Russia: 2.4,
    Brazil: 1.7,
    UK: 1.1,
    France: 0.4,
  },
  {
    year: 2018,
    USA: 5.1,
    China: 12.2,
    India: 3.6,
    Russia: 2.5,
    Brazil: 1.8,
    UK: 1.0,
    France: 0.3,
  },
  {
    year: 2019,
    USA: 4.9,
    China: 12.5,
    India: 3.7,
    Russia: 2.6,
    Brazil: 1.9,
    UK: 0.9,
    France: 0.2,
  },
];

export const scatterData = [
  { sector: "Transportation", emission: 1450, year: 2015 },
  { sector: "Industrial", emission: 2300, year: 2016 },
  { sector: "Residential", emission: 1200, year: 2017 },
  { sector: "Commercial", emission: 900, year: 2018 },
  { sector: "Electric Power", emission: 1900, year: 2019 },
  { sector: "Agriculture", emission: 800, year: 2020 },
  { sector: "Waste Management", emission: 500, year: 2021 },
  { sector: "Forestry", emission: 400, year: 2022 },
  { sector: "Other", emission: 600, year: 2023 },
  { sector: "Transportation", emission: 1500, year: 2016 },
  { sector: "Industrial", emission: 2400, year: 2017 },
];
