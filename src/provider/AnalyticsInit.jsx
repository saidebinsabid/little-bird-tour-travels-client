"use client";

import { useEffect } from "react";
import { initAnalytics } from "@/firebase/config";

// Mount-once: boot Firebase Analytics in the browser. Rendered in Providers.
export default function AnalyticsInit() {
  useEffect(() => {
    initAnalytics();
  }, []);
  return null;
}
