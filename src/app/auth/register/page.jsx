"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import useAuth from "@/hooks/useAuth";
import { useI18n } from "@/i18n/useI18n";
import AuthField from "@/components/auth/AuthField";
import { Spinner } from "@/components/ui/Loading";

export default function RegisterPage() {
  const { t } = useI18n();
  const { register } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ email: "", mobile: "", password: "" });
  const [show, setShow] = useState(false);
  const [agree, setAgree] = useState(true);
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return toast.error("Email and password are required");
    if (!agree) return toast.error("Please agree to the Terms & Conditions");
    setLoading(true);
    try {
      await register({
        name: form.email.split("@")[0],
        email: form.email,
        phone: form.mobile ? `+880${form.mobile.replace(/^0+/, "")}` : "",
        password: form.password,
      });
      toast.success("Account created!");
      router.push("/dashboard");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-ink">{t("nav.register")}</h1>
      <p className="mt-1 text-sm text-muted">Create an account to easily use our services.</p>

      <form onSubmit={submit} className="mt-6 space-y-4">
        <AuthField icon="mail" label="Email" type="email" value={form.email} onChange={set("email")} placeholder="someone@example.com" required />
        <AuthField
          icon="phone"
          label="Mobile"
          type="tel"
          value={form.mobile}
          onChange={set("mobile")}
          placeholder="1XXX XXXXXX"
          prefix={<span className="text-sm font-medium text-ink">+880</span>}
        />
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

        <label className="flex items-start gap-2 text-sm text-body">
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 h-4 w-4 accent-[var(--color-brand)]" />
          <span>By creating an account you agree to our <Link href="/terms" className="font-semibold text-brand hover:underline">Terms &amp; Conditions</Link></span>
        </label>

        <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-4 py-3 font-bold text-white transition hover:bg-brand-dark disabled:opacity-60">
          {loading ? <><Spinner /> Please wait…</> : t("nav.register")}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-muted">
        Already have an Account?{" "}
        <Link href="/auth/login" className="font-bold text-brand hover:underline">{t("nav.login")}</Link>
      </p>
    </>
  );
}
