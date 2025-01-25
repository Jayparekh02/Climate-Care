// authService.ts

import axios, { AxiosError } from "axios";
import { User } from "../models/User";
interface ApiError {
  message: string;
}

const API_BASE_URL: string | undefined = "http://localhost:4000"; // Replace this with your actual API base URL
export const registerAPI = async (userData: User) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error occurred during registration:", error);
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiError>;
      const message =
        axiosError.response?.data?.message ||
        "An unexpected error occurred during registration.";
      throw new Error(message);
    } else {
      throw new Error("A non-network error occurred during registration.");
    }
  }
};

export const loginAPI = async (credentials: any) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      `${API_BASE_URL}/login`,
      credentials,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error occurred during login:", error);
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiError>;
      const message =
        axiosError.response?.data?.message ||
        "An unexpected error occurred during login.";
      throw new Error(message);
    } else {
      throw new Error("A non-network error occurred during login.");
    }
  }
};
