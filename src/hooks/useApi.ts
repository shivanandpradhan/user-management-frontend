import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ApiResponse } from "../types";
import { AxiosError } from "axios";

export const useApiQuery = <T>(
  key: string[],
  queryFn: () => Promise<ApiResponse<T>>,
  options = {}
) => {
  return useQuery<ApiResponse<T>, AxiosError<ApiResponse<T>>>({
    queryKey: key,
    queryFn,
    ...options,
  });
};

export const useApiMutation = <T, V>(
  mutationFn: (data: V) => Promise<ApiResponse<T>>,
  options = {},
  invalidateQueries: string[][] = []
) => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<T>, AxiosError<ApiResponse<T>>, V>({
    mutationFn,
    onSuccess: () => {
      invalidateQueries.forEach((queryKey) => {
        queryClient.invalidateQueries({ queryKey });
      });
    },
    ...options,
  });
};
