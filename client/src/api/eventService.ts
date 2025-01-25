import axios from "axios";

const API_BASE_URL: string = "http://localhost:4000"; // Adjust according to your API server

// Utility to handle Axios errors
const handleAxiosError = (error: any) => {
  if (axios.isAxiosError(error)) {
    throw new Error(error.response?.data.message || error.message);
  } else {
    throw new Error("An unknown error occurred");
  }
};

export const createEvent = async (eventData: any, token: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/events`, eventData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const deleteEvent = async (eventId: string, token: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/events/${eventId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const updateEvent = async (
  eventId: string,
  eventData: any,
  token: string
) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/events/${eventId}`,
      eventData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const getEvents = async (
  token: string,
  category?: string,
  limit?: number
) => {
  try {
    console.log(token, "token");
    const response = await axios.get(`${API_BASE_URL}/events`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { category, limit },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const fetchRegisteredEvents = async (token: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/events/registered-events`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const volunteerForEvent = async (eventId: string, token: string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/events/volunteer/${eventId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const getMyEventsWithVolunteers = async (
  token: string,
  searchTerm: string
) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/events/my-events?searchTerm=${encodeURIComponent(
        searchTerm
      )}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};
