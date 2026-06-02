"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

// React Query over authenticated endpoints (sends the httpOnly cookie).
export function useSecureQuery(key, url, params = {}, options = {}) {
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: Array.isArray(key) ? key : [key, params],
    queryFn: async () => {
      const { data } = await axiosSecure.get(url, { params });
      return data;
    },
    ...options,
  });
}

// PATCH/POST/DELETE helper that invalidates a query key on success.
export function useSecureMutation(invalidateKey) {
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ method = "patch", url, body }) => {
      const { data } = await axiosSecure[method](url, body);
      return data;
    },
    onSuccess: () => {
      if (invalidateKey) qc.invalidateQueries({ queryKey: [invalidateKey] });
    },
  });
}
