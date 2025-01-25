import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  calculateEmissionAPI,
  getEmissionsAPI,
} from "../../api/emissionService";
import { Emission } from "../../models/Emission";

interface EmissionState {
  data: Emission | null;
  loading: boolean;
  error: string | null;
  history: [Emission] | [];
}

const initialState: EmissionState = {
  data: null,
  loading: false,
  error: null,
  history: [],
};

export const calculateData = createAsyncThunk(
  "emission/calculateData",
  async (emissionData: Emission, { rejectWithValue }) => {
    try {
      const { data } = await calculateEmissionAPI(emissionData);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Error logging in");
    }
  }
);

export const emissionHistory = createAsyncThunk(
  "emission/emissionHistory",
  async (userId: string, { rejectWithValue }) => {
    try {
      const { history } = await getEmissionsAPI(userId);
      return history;
    } catch (error: any) {
      return rejectWithValue(error.message || "Error logging in");
    }
  }
);

export const emissionSlice = createSlice({
  name: "emission",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(calculateData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(calculateData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(calculateData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(emissionHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(emissionHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload;
      })
      .addCase(emissionHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// export const { logout } = emissionSlice.actions;

export default emissionSlice.reducer;
