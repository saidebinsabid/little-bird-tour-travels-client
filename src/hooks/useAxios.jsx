import axios from "axios";

// Plain client for PUBLIC endpoints (no credentials needed).
const axiosPublic = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
});

const useAxios = () => axiosPublic;

export default useAxios;
