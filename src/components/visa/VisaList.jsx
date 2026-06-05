"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useI18n } from "@/i18n/useI18n";
import { useContentList } from "@/hooks/useContent";
import Container from "@/components/ui/Container";
import VisaCard from "./VisaCard";
import { SkeletonGrid } from "@/components/ui/Loading";
import Pagination from "@/components/ui/Pagination";

export default function VisaList() {
  const { t } = useI18n();
  const params = useSearchParams();
  const country = params.get("country") || "";
  const type = params.get("type") || "";

  const [page, setPage] = useState(1);
  useEffect(() => { setPage(1); }, [country, type]);

  const query = { status: "published", limit: 12, page };
  if (country) query.country = country;
  if (type) query.visaType = type;
  const { data, isLoading } = useContentList("visas", query);
  const items = data?.data || [];
  const totalPages = data?.pagination?.pages || 1;

  return (
    <Container>
      <div className="py-12">
        {isLoading ? (
          <SkeletonGrid count={6} />
        ) : items.length ? (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map((v) => <VisaCard key={v._id} item={v} />)}
            </div>
            <Pagination page={page} totalPages={totalPages} onChange={setPage} />
          </>
        ) : (
          <div className="rounded-2xl bg-surface py-20 text-center text-muted">{t("common.noResults")}</div>
        )}
      </div>
    </Container>
  );
}
