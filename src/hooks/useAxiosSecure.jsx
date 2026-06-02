"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Client for AUTHENTICATED endpoints. Sends the httpOnly cookie and bounces the
// user on 401/403. Use this inside React Query hooks for protected data.
const axiosSecure = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const router = useRouter();

  useEffect(() => {
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      (error) => {
        const status = error?.response?.status;
        if (status === 403) router.push("/forbidden");
        else if (status === 401) router.push("/auth/login");
        return Promise.reject(error);
      }
    );
    return () => axiosSecure.interceptors.response.eject(responseInterceptor);
  }, [router]);

  return axiosSecure;
};

export default useAxiosSecure;
