"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useI18n } from "@/i18n/useI18n";
import { useCreateInquiry, useSettings } from "@/hooks/useContent";
import { Input, Textarea } from "@/components/ui/Field";
import Button from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Loading";

/**
 * The one lead form, reused everywhere. Pass `type` + optional ref info so the
 * admin sees which package/route/visa the lead came from. Below the submit
 * button it shows a "Chat on WhatsApp" shortcut for quick questions.
 */
export default function InquiryForm({
  type = "general",
  refId = null,
  refType = null,
  defaultSubject = "",
  compact = false,
}) {
  const { t, lang } = useI18n();
  const { mutateAsync, isPending } = useCreateInquiry();
  const { data: settings } = useSettings();
  const [form, setForm] = useState({ name: "", phone: "", email: "", travelDate: "", message: "" });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const wa = settings?.contact?.whatsapp?.replace(/[^0-9]/g, "");
  const waText = encodeURIComponent(
    defaultSubject
      ? `Hi, I have a question about: ${defaultSubject}`
      : "Hi, I have a travel question."
  );
  const waHref = wa ? `https://wa.me/${wa}?text=${waText}` : null;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast.error(t("form.required"));
      return;
    }
    try {
      await mutateAsync({ type, refId, refType, subject: defaultSubject, ...form });
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

      {/* Quick WhatsApp shortcut */}
      {waHref && (
        <a
          href={waHref}
          target="_blank"
          rel="noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-500 px-4 py-2.5 font-semibold text-white transition hover:bg-green-600"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.519 5.26l-.999 3.648 3.97-.747zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
          {lang === "bn" ? "হোয়াটসঅ্যাপে জিজ্ঞাসা করুন" : "Chat on WhatsApp"}
        </a>
      )}
    </form>
  );
}
