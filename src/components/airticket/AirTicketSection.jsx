"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { useI18n } from "@/i18n/useI18n";
import { useContentList, useCreateInquiry } from "@/hooks/useContent";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { Input, Select } from "@/components/ui/Field";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { Spinner, SkeletonGrid } from "@/components/ui/Loading";
import { priceLabel } from "@/utils/format";

export default function AirTicketSection() {
  const { t, lang } = useI18n();
  const { data } = useContentList("air-tickets", { status: "published", limit: 8 });
  const { mutateAsync, isPending } = useCreateInquiry();
  const fares = data?.data || [];

  const [form, setForm] = useState({
    from: "", to: "", tripType: "round-trip", date: "", pax: 1, name: "", phone: "",
  });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.from || !form.to || !form.phone) {
      toast.error(t("form.required"));
      return;
    }
    try {
      await mutateAsync({
        type: "air-ticket",
        name: form.name || "Air ticket lead",
        phone: form.phone,
        subject: `${form.from} → ${form.to}`,
        message: `Trip: ${form.tripType}, Date: ${form.date}, Pax: ${form.pax}`,
        meta: { from: form.from, to: form.to, tripType: form.tripType, date: form.date, pax: form.pax },
      });
      toast.success(t("form.inquirySent"));
      setForm({ from: "", to: "", tripType: "round-trip", date: "", pax: 1, name: "", phone: "" });
    } catch {
      toast.error("Something went wrong.");
    }
  };

  return (
    <Container>
      {/* Search / quote form */}
      <div className="mt-10 rounded-2xl bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-slate-200">
        <h2 className="mb-4 text-xl font-bold text-ink">
          {lang === "bn" ? "ফ্লাইট কোটেশন নিন" : "Get a Flight Quote"}
        </h2>
        <form onSubmit={submit} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Input label={lang === "bn" ? "কোথা থেকে" : "From"} placeholder="Dhaka (DAC)" value={form.from} onChange={set("from")} required />
          <Input label={lang === "bn" ? "কোথায়" : "To"} placeholder="Dubai (DXB)" value={form.to} onChange={set("to")} required />
          <Select label={lang === "bn" ? "ট্রিপ" : "Trip type"} value={form.tripType} onChange={set("tripType")}>
            <option value="round-trip">Round-trip</option>
            <option value="one-way">One-way</option>
            <option value="multi-city">Multi-city</option>
          </Select>
          <Input type="date" label={t("form.travelDate")} value={form.date} onChange={set("date")} />
          <Input type="number" min="1" label={lang === "bn" ? "যাত্রী" : "Passengers"} value={form.pax} onChange={set("pax")} />
          <Input label={t("form.phone")} placeholder="01XXXXXXXXX" value={form.phone} onChange={set("phone")} required />
          <div className="sm:col-span-2 lg:col-span-3">
            <Button type="submit" disabled={isPending}>
              {isPending ? <><Spinner /> {t("common.sending")}</> : <>✈️ {lang === "bn" ? "কোটেশন চাই" : "Request Quote"}</>}
            </Button>
          </div>
        </form>
      </div>

      {/* Featured fares */}
      <section className="py-14">
        <SectionHeading title={lang === "bn" ? "জনপ্রিয় ভাড়া" : "Popular Fares"} />
        <div className="mt-10">
          {!fares.length ? (
            <SkeletonGrid count={4} />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {fares.map((f) => (
                <div key={f._id} className="card-base overflow-hidden shadow-[var(--shadow-card)]">
                  <div className="relative h-32">
                    {f.cover && <Image src={f.cover} alt={f.to} fill sizes="25vw" className="object-cover" />}
                    <Badge tone="accent" className="absolute right-2 top-2">{f.tripType}</Badge>
                  </div>
                  <div className="p-4">
                    <p className="font-bold text-ink">{f.from} → {f.to}</p>
                    <p className="text-sm text-muted">{f.airline}</p>
                    <p className="mt-2 text-lg font-extrabold text-accent-dark">{priceLabel(f.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Container>
  );
}
