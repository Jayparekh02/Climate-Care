// authService.ts

import axios, { AxiosError } from "axios";
import { Emission } from "../models/Emission";

const API_BASE_URL: string | undefined = "http://localhost:4000"; // Replace this with your actual API base URL
export const calculateEmissionAPI = async (emissionData: Emission) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/emission/calculate-emission`,
      emissionData
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error occurred during calculating emission data:", error);
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      throw new Error(axiosError.message);
    } else {
      // Handle non-Axios errors
      throw new Error("Error calculating data: " + error);
    }
  }
};

export const getEmissionsAPI = async (userId: string) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.get(
      `${API_BASE_URL}/emission/emission-data/${userId}`,
      config
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      throw new Error(axiosError.message);
    } else {
      // Handle non-Axios errors
      throw new Error("Error fetching data");
    }
  }
};
