import axiosInstance from "./axios";
import type { UserProfileDto, ApiResponse, PaginatedResponse } from "../types";

export const getUsers = (params: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<ApiResponse<PaginatedResponse<UserProfileDto>>> => {
  return axiosInstance.get("/admin/users", { params });
};

export const getUserDetails = (
  userId: string,
  actingUserId: string
): Promise<ApiResponse<UserProfileDto>> => {
  return axiosInstance.get(`/admin/users/${userId}`, {
    headers: {
      "x-user-id": actingUserId,
    },
  });
};

export const lockUser = (
  userId: string,
  actingUserId: string
): Promise<ApiResponse<void>> => {
  return axiosInstance.put(`/admin/users/${userId}/lock`, undefined, {
    headers: {
      "x-user-id": actingUserId,
    },
  });
};

export const unlockUser = (
  userId: string,
  actingUserId: string
): Promise<ApiResponse<void>> => {
  return axiosInstance.put(`/admin/users/${userId}/unlock`, undefined, {
    headers: {
      "x-user-id": actingUserId,
    },
  });
};

export const enableUser = (
  userId: string,
  actingUserId: string
): Promise<ApiResponse<void>> => {
  return axiosInstance.put(`/admin/users/${userId}/enable`, undefined, {
    headers: {
      "x-user-id": actingUserId,
    },
  });
};

export const disableUser = (
  userId: string,
  actingUserId: string
): Promise<ApiResponse<void>> => {
  return axiosInstance.put(`/admin/users/${userId}/disable`, undefined, {
    headers: {
      "x-user-id": actingUserId,
    },
  });
};
