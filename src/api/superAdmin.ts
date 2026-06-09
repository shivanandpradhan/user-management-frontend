import axiosInstance from "./axios";
import type { UserProfileDto, ApiResponse, PaginatedResponse } from "../types";

export const getAdmins = (params: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<ApiResponse<PaginatedResponse<UserProfileDto>>> => {
  return axiosInstance.get("/super-admin/users", { params });
};

export const promoteToAdmin = (
  userId: string,
  actingUserId: string
): Promise<ApiResponse<void>> => {
  return axiosInstance.post(
    `/super-admin/users/${userId}/promote-to-admin`,
    {},
    {
      headers: {
        "x-user-id": actingUserId,
      },
    }
  );
};

export const demoteFromAdmin = (
  userId: string,
  actingUserId: string
): Promise<ApiResponse<void>> => {
  return axiosInstance.post(
    `/super-admin/users/${userId}/demote-from-admin`,
    {},
    {
      headers: {
        "x-user-id": actingUserId,
      },
    }
  );
};

export const promoteToSuperAdmin = (
  userId: string
): Promise<ApiResponse<void>> => {
  return axiosInstance.post(
    `/super-admin/users/${userId}/promote-to-super-admin`
  );
};

export const demoteFromSuperAdmin = (
  userId: string
): Promise<ApiResponse<void>> => {
  return axiosInstance.post(
    `/super-admin/users/${userId}/demote-from-super-admin`
  );
};

export const getSystemSettings = (): Promise<ApiResponse<any>> => {
  return axiosInstance.get("/super-admin/system-settings");
};

export const updateSystemSettings = (data: any): Promise<ApiResponse<any>> => {
  return axiosInstance.put("/super-admin/system-settings", data);
};
