import axiosInstance from "./axios";
import type { UserProfileDto, ApiResponse } from "../types";
import type { UserSecurityDto } from "../types/user";

export const getProfile = (): Promise<ApiResponse<UserProfileDto>> => {
  return axiosInstance.get("/users/me");
};

export const getProfileByUserId = (
  userId: string
): Promise<ApiResponse<UserProfileDto>> => {
  return axiosInstance.get("/users/me", {
    headers: {
      "X-User-Id": userId,
    },
  });
};

export const updateProfile = (
  userId: string,
  data: UserProfileDto
): Promise<ApiResponse<UserProfileDto>> => {
  return axiosInstance.put("/users/me", data, {
    headers: {
      "x-user-id": userId,
    },
  });
};

export const deleteAccount = (): Promise<ApiResponse<void>> => {
  return axiosInstance.delete("/users/me");
};

export const getUserSecurity = (): Promise<ApiResponse<UserSecurityDto>> => {
  return axiosInstance.get("/users/me/security");
};

export const revokeSession = (
  sessionId: string
): Promise<ApiResponse<void>> => {
  return axiosInstance.delete(`/users/me/sessions/${sessionId}`);
};

export const changePassword = async ({
  userId,
  currentPassword,
  newPassword,
}: {
  userId: string;
  currentPassword: string;
  newPassword: string;
}) => {
  const response = await axiosInstance.post(
    "/auth/change-password",
    {
      currentPassword,
      newPassword,
    },
    {
      headers: {
        "x-user-id": userId,
      },
    }
  );
  return response.data;
};
