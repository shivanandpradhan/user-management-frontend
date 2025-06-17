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

export const lockUser = (userId: string): Promise<ApiResponse<void>> => {
  return axiosInstance.put(`/admin/users/${userId}/lock`);
};

export const unlockUser = (userId: string): Promise<ApiResponse<void>> => {
  return axiosInstance.put(`/admin/users/${userId}/unlock`);
};

export const enableUser = (userId: string): Promise<ApiResponse<void>> => {
  return axiosInstance.put(`/admin/users/${userId}/enable`);
};

export const disableUser = (userId: string): Promise<ApiResponse<void>> => {
  return axiosInstance.put(`/admin/users/${userId}/disable`);
};
