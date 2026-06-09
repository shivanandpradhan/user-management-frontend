import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { AuthResponse } from "../../types";
// import axios from "axios";
import axiosInstance from "../../api/axios";

interface AuthState {
  token: string | null;
  user: {
    id: string;
    username: string;
    email: string;
    roles: string[];
    mfaEnabled: boolean;
  } | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  error: null,
};

export const login = createAsyncThunk<
  AuthResponse,
  { usernameOrEmail: string; password: string },
  { rejectValue: string }
>("auth/login", async (credentials, { dispatch, rejectWithValue }) => {
  try {
    dispatch(loginStart());
    const response = await axiosInstance.post<AuthResponse>(
      "/auth/login",
      credentials
    );
    dispatch(loginSuccess(response.data));
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Login failed";
    dispatch(loginFailure(message));
    return rejectWithValue(message);
  }
});

export const signup = createAsyncThunk<
  AuthResponse,
  { username: string; email: string; password: string },
  { rejectValue: string }
>("auth/signup", async (formData, { dispatch, rejectWithValue }) => {
  try {
    dispatch(loginStart());
    const response = await axiosInstance.post<AuthResponse>(
      "/auth/signup",
      formData
    );
    dispatch(loginSuccess(response.data));
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Signup failed";
    dispatch(loginFailure(message));
    return rejectWithValue(message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<AuthResponse>) {
      state.token = action.payload.accessToken;
      state.user = {
        id: action.payload.userId,
        username: action.payload.username,
        email: action.payload.email,
        roles: action.payload.roles || [],
        mfaEnabled: action.payload.mfaEnabled,
      };
      state.isAuthenticated = action.payload.accessToken ? true : false;
      state.loading = false;

      localStorage.setItem("token", action.payload.accessToken);
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    setMfaEnabled(state, action: PayloadAction<boolean>) {
      if (state.user) {
        state.user.mfaEnabled = action.payload;
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  setMfaEnabled,
  clearError,
} = authSlice.actions;
export default authSlice.reducer;
