"use client";

import { useState } from "react";
import { useI18n } from "@/i18n/useI18n";
import { useContentList } from "@/hooks/useContent";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { SkeletonGrid } from "@/components/ui/Loading";
import { priceLabel } from "@/utils/format";
import InquiryForm from "@/components/forms/InquiryForm";

export default function VisaList() {
  const { t, pick, lang } = useI18n();
  const { data, isLoading } = useContentList("visas", { status: "published", limit: 24 });
  const items = data?.data || [];
  const [active, setActive] = useState(null);

  return (
    <Container>
      <div className="py-12">
        {isLoading ? (
          <SkeletonGrid count={6} />
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((v) => (
              <div key={v._id} className="card-base flex flex-col p-6 shadow-[var(--shadow-card)]">
                <div className="flex items-center justify-between">
                  <span className="text-4xl">{v.flag || "🌍"}</span>
                  <Badge tone="brand">{v.visaType}</Badge>
                </div>
                <h3 className="mt-3 text-lg font-bold text-ink">{pick(v.title)}</h3>
                <dl className="mt-3 space-y-1 text-sm text-body">
                  <div className="flex justify-between"><dt className="text-muted">{lang === "bn" ? "ফি" : "Service fee"}</dt><dd className="font-semibold">{priceLabel(v.fee)}</dd></div>
                  <div className="flex justify-between"><dt className="text-muted">{lang === "bn" ? "প্রসেসিং" : "Processing"}</dt><dd>{v.processingTime}</dd></div>
                </dl>
                {(pick(v.requirements) || v.requirements?.en)?.length > 0 && (
                  <ul className="mt-3 space-y-1 text-sm text-body">
                    {(pick(v.requirements) || v.requirements?.en).slice(0, 4).map((r, i) => (
                      <li key={i} className="flex gap-2"><span className="text-brand">•</span>{r}</li>
                    ))}
                  </ul>
                )}
                <Button className="mt-5" full onClick={() => setActive(v)}>{t("common.inquireNow")}</Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Inquiry modal */}
      {active && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4" onClick={() => setActive(null)}>
          <div className="w-full max-w-md rounded-2xl bg-white p-6" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-ink">{pick(active.title)}</h3>
              <button onClick={() => setActive(null)} className="text-2xl text-muted hover:text-ink">×</button>
            </div>
            <InquiryForm type="visa" refId={active._id} refType="visas" defaultSubject={pick(active.title)} compact />
          </div>
        </div>
      )}
    </Container>
  );
}
