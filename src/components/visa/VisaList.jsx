"use client";

import { useSearchParams } from "next/navigation";
import { useI18n } from "@/i18n/useI18n";
import { useContentList } from "@/hooks/useContent";
import Container from "@/components/ui/Container";
import VisaCard from "./VisaCard";
import { SkeletonGrid } from "@/components/ui/Loading";

export default function VisaList() {
  const { t } = useI18n();
  const params = useSearchParams();
  const query = { status: "published", limit: 24 };
  if (params.get("country")) query.country = params.get("country");
  if (params.get("type")) query.visaType = params.get("type");
  const { data, isLoading } = useContentList("visas", query);
  const items = data?.data || [];

  return (
    <Container>
      <div className="py-12">
        {isLoading ? (
          <SkeletonGrid count={6} />
        ) : items.length ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((v) => <VisaCard key={v._id} item={v} />)}
          </div>
        ) : (
          <div className="rounded-2xl bg-surface py-20 text-center text-muted">{t("common.noResults")}</div>
        )}
      </div>
    </Container>
  );
}
