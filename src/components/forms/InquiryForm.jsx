"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useI18n } from "@/i18n/useI18n";
import { useCreateInquiry } from "@/hooks/useContent";
import { Input, Textarea } from "@/components/ui/Field";
import Button from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Loading";

/**
 * The one lead form, reused everywhere. Pass `type` + optional ref info so the
 * admin sees which package/route/visa the lead came from.
 */
export default function InquiryForm({
  type = "general",
  refId = null,
  refType = null,
  defaultSubject = "",
  compact = false,
}) {
  const { t } = useI18n();
  const { mutateAsync, isPending } = useCreateInquiry();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    travelDate: "",
    message: "",
  });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast.error(t("form.required"));
      return;
    }
    try {
      await mutateAsync({
        type,
        refId,
        refType,
        subject: defaultSubject,
        ...form,
      });
      toast.success(t("form.inquirySent"));
      setForm({ name: "", phone: "", email: "", travelDate: "", message: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <Input placeholder={t("form.name")} value={form.name} onChange={set("name")} required />
      <Input placeholder={t("form.phone")} value={form.phone} onChange={set("phone")} required />
      <Input type="email" placeholder={t("form.email")} value={form.email} onChange={set("email")} />
      {!compact && (
        <Input type="date" placeholder={t("form.travelDate")} value={form.travelDate} onChange={set("travelDate")} />
      )}
      <Textarea placeholder={t("form.message")} rows={compact ? 3 : 4} value={form.message} onChange={set("message")} />
      <Button type="submit" full disabled={isPending}>
        {isPending ? <><Spinner /> {t("common.sending")}</> : t("common.inquireNow")}
      </Button>
    </form>
  );
}
