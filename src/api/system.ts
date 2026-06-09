import axios from "axios";
import type { ApiResponse } from "../types";

export type SystemMetricsResponse = {
  totalUsers: number;
  activeSessions: number;
  storageUsed: number;
};

export const getSystemMetrics = async (): Promise<
  ApiResponse<SystemMetricsResponse>
> => {
  const response = await axios.get<ApiResponse<SystemMetricsResponse>>(
    "/api/system/metrics"
  );
  return response.data;
};
