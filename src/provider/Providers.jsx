"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import StoreProvider from "@/redux/StoreProvider";
import AuthProvider from "@/provider/AuthProvider";
import { LanguageInit } from "@/i18n/useI18n";
import AnalyticsInit from "@/provider/AnalyticsInit";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// React Query owns SERVER state (data fetching + cache); Redux Toolkit owns
// CLIENT state (auth identity, role, UI). Two distinct concerns, one each.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Wrap order matters: Store (outermost) → Query → Auth → app.
export default function Providers({ children }) {
  return (
    <StoreProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <LanguageInit />
          <AnalyticsInit />
          {children}
          <ToastContainer position="top-right" autoClose={3000} />
        </AuthProvider>
      </QueryClientProvider>
    </StoreProvider>
  );
}
