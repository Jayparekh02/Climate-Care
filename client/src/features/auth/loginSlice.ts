import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../models/User";
import { loginAPI } from "../../api/authService";

interface AuthState {
  user: User | null;
  token: string;
  error: string | null;
  loading: boolean;
  snackbarOpen: boolean;
  snackbarMessage: string;
  snackbarSeverity: "success" | "error" | "info";
}

const initialState: AuthState = {
  user: null,
  token: "",
  error: null,
  loading: false,
  snackbarOpen: false,
  snackbarMessage: "",
  snackbarSeverity: "info",
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const { user, token } = await loginAPI(credentials);
      return { user, token };
    } catch (error: any) {
      return rejectWithValue(error.message || "Error logging in");
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = "";
      state.error = null;
      state.snackbarOpen = false;
      state.snackbarMessage = "";
    },
    closeSnackbar(state) {
      state.snackbarOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.snackbarOpen = true;
        state.snackbarMessage = "Login successful";
        state.snackbarSeverity = "success";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.snackbarOpen = true;
        state.snackbarMessage = state.error;
        state.snackbarSeverity = "error";
      });
  },
});

export const { logout, closeSnackbar } = loginSlice.actions;
export default loginSlice.reducer;
