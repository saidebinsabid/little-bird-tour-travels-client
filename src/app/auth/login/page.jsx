"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import useAuth from "@/hooks/useAuth";
import { useI18n } from "@/i18n/useI18n";
import AuthField from "@/components/auth/AuthField";
import { Spinner } from "@/components/ui/Loading";

function GoogleButton({ onClick, loading }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-ink transition hover:bg-slate-50 disabled:opacity-60"
    >
      {loading ? (
        <Spinner className="h-5 w-5 text-brand" />
      ) : (
        <svg viewBox="0 0 48 48" className="h-5 w-5">
          <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35.5 24 35.5 16.8 35.5 11 29.7 11 22.5S16.8 9.5 24 9.5c3.3 0 6.3 1.2 8.6 3.3l5.7-5.7C34.6 3.9 29.6 2 24 2 12.9 2 4 10.9 4 22.5S12.9 43 24 43s20-8.9 20-20.5c0-1.4-.1-2.7-.4-4z" />
          <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.3 0 6.3 1.2 8.6 3.3l5.7-5.7C34.6 7.9 29.6 6 24 6 16 6 9.1 10.6 6.3 14.7z" transform="translate(0 -4)" />
          <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3C29.2 35 26.7 36 24 36c-5.3 0-9.7-3.1-11.3-7.5l-6.5 5C9.4 39.3 16.1 44 24 44z" />
          <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.1 5.5l6.3 5.3C40.9 36 44 30.6 44 24c0-1.2-.1-2.4-.4-3.5z" />
        </svg>
      )}
      Login with Google
    </button>
  );
}

function LoginForm() {
  const { t } = useI18n();
  const { login, loginWithGoogle } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const [form, setForm] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gLoading, setGLoading] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const goNext = () => router.push(params.get("from") || "/dashboard");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success("Welcome back!");
      goNext();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setGLoading(true);
    try {
      await loginWithGoogle();
      toast.success("Welcome!");
      goNext();
    } catch (err) {
      const code = err?.code || "";
      if (code === "auth/popup-closed-by-user" || code === "auth/cancelled-popup-request") {
        // user dismissed the popup — no error needed
      } else if (code === "auth/operation-not-allowed") {
        toast.error("Google sign-in isn't enabled in Firebase Console yet.");
      } else if (code === "auth/unauthorized-domain") {
        toast.error("This domain isn't authorized in Firebase Auth settings.");
      } else {
        toast.error(err?.response?.data?.message || err?.message || "Google sign-in failed");
      }
    } finally {
      setGLoading(false);
    }
  };

  return (
    <>
      <GoogleButton onClick={handleGoogle} loading={gLoading} />

      <div className="my-6 flex items-center gap-3 text-sm text-muted">
        <span className="h-px flex-1 bg-slate-200" /> OR <span className="h-px flex-1 bg-slate-200" />
      </div>

      <h1 className="text-2xl font-bold text-ink">{t("nav.login")}</h1>

      <form onSubmit={submit} className="mt-5 space-y-4">
        <AuthField icon="mail" label="Email" type="email" value={form.email} onChange={set("email")} placeholder="someone@example.com" required />
        <AuthField
          icon="lock"
          label="Password"
          type={show ? "text" : "password"}
          value={form.password}
          onChange={set("password")}
          placeholder="some@pass#123"
          showToggle
          toggled={show}
          onToggle={() => setShow((s) => !s)}
          required
        />

        <div className="text-right">
          <button type="button" onClick={() => toast.info("Password reset is coming soon.")} className="text-sm font-semibold text-brand hover:underline">
            Forgot Password?
          </button>
        </div>

        <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-4 py-3 font-bold text-white transition hover:bg-brand-dark disabled:opacity-60">
          {loading ? <><Spinner /> Please wait…</> : t("nav.login")}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-muted">
        Don&apos;t have an Account?{" "}
        <Link href="/auth/register" className="font-bold text-brand hover:underline">{t("nav.register")}</Link>
      </p>
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
