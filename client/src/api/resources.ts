// services/resourceService.ts

import axios, { AxiosError } from "axios";
import { IResource } from "../utils/types";

const API_BASE_URL: string | undefined = "http://localhost:4000";

export const fetchArticles = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/resources`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      throw new Error(axiosError.message);
    } else {
      throw new Error("Error fetching articles");
    }
  }
};

// export const fetchVideos = async (): Promise<IResource[]> => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/resources`);
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       const axiosError = error as AxiosError;
//       throw new Error(axiosError.message);
//     } else {
//       throw new Error("Error fetching videos");
//     }
//   }
// };

// export const createResource = async (resourceData: IResource) => {
//   try {
//     const response = await axios.post(
//       `${API_BASE_URL}/resources`,
//       resourceData
//     );
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       const axiosError = error as AxiosError;
//       throw new Error(axiosError.message);
//     } else {
//       throw new Error("Error creating resource");
//     }
//   }
// };

// src/services/resourceService.js
export const createResource = async (resourceData: any) => {
  const response = await axios.post(`${API_BASE_URL}/resources`, resourceData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response.data);
  if (response.status == 400) {
    throw new Error("Failed to create resource");
  }

  return await response.data;
};

export const updateResource = async (
  id: string,
  resourceData: Partial<IResource>
) => {
  try {
    const response = await axios.put<IResource>(
      `${API_BASE_URL}/api/resources/${id}`,
      resourceData
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      throw new Error(axiosError.message);
    } else {
      throw new Error("Error updating resource");
    }
  }
};

export const deleteResource = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/api/resources/${id}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      throw new Error(axiosError.message);
    } else {
      throw new Error("Error deleting resource");
    }
  }
};
