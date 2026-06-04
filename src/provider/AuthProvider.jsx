"use client";

import { createContext, useContext, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/firebase/config";
import { setUser, setRole, setLoading, clearAuth } from "@/redux/features/auth/authSlice";

// Identity STATE lives in Redux (authSlice); auth METHODS live here in context.
// We talk to our own Express API via the httpOnly `accessToken` cookie, so every
// call uses withCredentials. No client-side token handling — the cookie is it.
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
  withCredentials: true,
});

const AuthContext = createContext(null);

export function useAuthContext() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const hydrate = useCallback(
    (user) => {
      dispatch(setUser(user || null));
      dispatch(setRole(user?.role || null));
      dispatch(setLoading(false));
    },
    [dispatch]
  );

  // On mount, ask the API who we are (valid cookie → user, else null).
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const { data } = await api.get("/auth/me");
        if (active) hydrate(data.user);
      } catch {
        if (active) hydrate(null);
      }
    })();
    return () => {
      active = false;
    };
  }, [hydrate]);

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    hydrate(data.user);
    return data.user;
  };

  const register = async (payload) => {
    const { data } = await api.post("/auth/register", payload);
    hydrate(data.user);
    return data.user;
  };

  // Firebase Google popup → send the ID token to our API → cookie session.
  const loginWithGoogle = async () => {
    if (!auth) throw new Error("Firebase is not configured");
    const result = await signInWithPopup(auth, googleProvider);
    const idToken = await result.user.getIdToken();
    const { data } = await api.post("/auth/google", { idToken });
    hydrate(data.user);
    return data.user;
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      dispatch(clearAuth());
      dispatch(setLoading(false));
      // Signing out yourself → go to the home page.
      router.push("/");
    }
  };

  return (
    <AuthContext.Provider value={{ login, register, logout, loginWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}
