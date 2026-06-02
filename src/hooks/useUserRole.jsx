"use client";

import { useSelector } from "react-redux";

// Role lives in Redux (set by AuthProvider after a backend lookup).
const useUserRole = () => {
  const { role, loading } = useSelector((s) => s.auth);
  return { role, roleLoading: loading };
};

export default useUserRole;
