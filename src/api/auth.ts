import axiosInstance from "./axios";
import type {
  LoginRequest,
  SignUpRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  VerifyOtpRequest,
  MfaSetupRequest,
  MfaVerifyRequest,
  AuthResponse,
  ApiResponse,
} from "../types/auth";

export const login = (
  data: LoginRequest
): Promise<ApiResponse<AuthResponse>> => {
  return axiosInstance.post("/auth/login", data);
};

export const signUp = (
  data: SignUpRequest
): Promise<ApiResponse<AuthResponse>> => {
  return axiosInstance.post("/auth/signup", data);
};

export const forgotPassword = (
  data: ForgotPasswordRequest
): Promise<ApiResponse<void>> => {
  return axiosInstance.post("/auth/forgot-password", data);
};

export const resetPassword = (
  data: ResetPasswordRequest
): Promise<ApiResponse<void>> => {
  return axiosInstance.post("/auth/reset-password", data);
};

export const verifyOtp = (
  data: VerifyOtpRequest
): Promise<ApiResponse<AuthResponse>> => {
  return axiosInstance.post("/auth/verify-otp", data);
};

export const setupMfa = (
  userId: string,
  data: MfaSetupRequest
): Promise<ApiResponse<{ qrCode: string; secret: string }>> => {
  return axiosInstance.post("/auth/mfa/setup", data, {
    headers: {
      "x-user-id": userId,
    },
  });
};

export const verifyMfa = (
  data: MfaVerifyRequest
): Promise<ApiResponse<void>> => {
  return axiosInstance.post("/auth/mfa/verify", data);
};

export const disableMfa = (userId: string): Promise<ApiResponse<void>> => {
  return axiosInstance.post(
    "/auth/mfa/disable",
    {},
    {
      headers: {
        "x-user-id": userId,
      },
    }
  );
};

export const refreshToken = (
  refreshToken: string
): Promise<ApiResponse<{ accessToken: string }>> => {
  return axiosInstance.post("/auth/refresh-token", { refreshToken });
};
