"use client";

import { useSelector } from "react-redux";
import { useAuthContext } from "@/provider/AuthProvider";

// Read identity from Redux (state) + methods from context (login/logout/...).
const useAuth = () => {
  const { user, loading } = useSelector((s) => s.auth);
  const methods = useAuthContext();
  return { user, loading, ...methods };
};

export default useAuth;
