import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/User";
import { registerAPI } from "../../api/authService";

interface AuthState {
  user: User | null;
  token: string | null;
  error: string | null;
  loading: boolean;
  snackbarOpen: boolean;
  snackbarMessage: string;
  snackbarSeverity: "success" | "info" | "error" | "warning";
}

const initialState: AuthState = {
  user: null,
  token: null,
  error: null,
  loading: false,
  snackbarOpen: false,
  snackbarMessage: "",
  snackbarSeverity: "info",
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData: User, { rejectWithValue }) => {
    try {
      const response = await registerAPI(userData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || "Error registering user");
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    closeSnackbar(state) {
      state.snackbarOpen = false;
      state.snackbarMessage = "";
      state.snackbarSeverity = "info";
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token; // Assuming the API response contains a token.
        state.snackbarMessage = "Registration successful";
        state.snackbarSeverity = "success";
        state.snackbarOpen = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.snackbarMessage = action.payload as string;
        state.snackbarSeverity = "error";
        state.snackbarOpen = true;
      });
  },
});

export const { closeSnackbar, logout } = registerSlice.actions;
export default registerSlice.reducer;
