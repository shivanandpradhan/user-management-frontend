export interface LoginRequest {
  usernameOrEmail: string;
  password: string;
  mfaCode: string;
}

export interface SignUpRequest {
  username: string;
  email: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface VerifyOtpRequest {
  usernameOrEmail: string;
  otp: string;
}

export interface MfaSetupRequest {
  mfaType: string;
}

export interface MfaVerifyRequest {
  code: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  mfaEnabled: boolean;
  mfaType?: string;
  userId: string;
  username: string;
  email: string;
  roles?: string[];
}

export interface ApiResponse<T> {
  meta: {
    timestamp: string;
    version?: string;
    path?: string;
    method?: string;
    requestId?: string;
  };
  data?: T;
  errors?: Array<{
    code: string;
    message: string;
    field?: string;
    detail?: string;
  }>;
}
