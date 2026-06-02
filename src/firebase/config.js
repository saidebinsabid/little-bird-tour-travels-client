// Firebase web app (used for Google Analytics). Public config only — these
// keys are safe to ship to the browser. Initialized lazily and guarded so the
// app works even if the config isn't present.
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const firebaseApp = firebaseConfig.apiKey
  ? getApps().length
    ? getApps()[0]
    : initializeApp(firebaseConfig)
  : null;

// Firebase Auth (browser only) + a Google provider for sign-in popups.
export const auth =
  typeof window !== "undefined" && firebaseApp ? getAuth(firebaseApp) : null;
export const googleProvider = new GoogleAuthProvider();

// Analytics only runs in a supported browser environment.
// Set NEXT_PUBLIC_ENABLE_ANALYTICS=false to disable (recommended in dev/preview).
export async function initAnalytics() {
  if (process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "false") return null;
  if (typeof window === "undefined" || !firebaseApp) return null;
  try {
    if (await isSupported()) return getAnalytics(firebaseApp);
  } catch {
    /* analytics unavailable (e.g. SSR / unsupported) */
  }
  return null;
}
