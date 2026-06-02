"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useI18n } from "@/i18n/useI18n";
import { useContentList } from "@/hooks/useContent";
import PackageCard from "./PackageCard";
import Container from "@/components/ui/Container";
import { Input, Select } from "@/components/ui/Field";
import { SkeletonGrid } from "@/components/ui/Loading";
import Button from "@/components/ui/Button";

const TYPES = ["domestic", "international", "honeymoon", "family", "adventure", "group", "corporate"];

export default function PackagesBrowser({ resource = "packages", basePath = "/packages", typeOptions = TYPES, showType = true }) {
  const { t, lang } = useI18n();
  const params = useSearchParams();

  const [filters, setFilters] = useState({
    search: params.get("search") || "",
    type: params.get("type") || "",
    price_max: "",
    sort: "",
    page: 1,
  });

  const query = { status: "published", limit: 9, page: filters.page };
  if (filters.search) query.search = filters.search;
  if (filters.type) query.type = filters.type;
  if (filters.price_max) query.price_max = filters.price_max;
  if (filters.sort === "price-asc") { query.sort = "price.amount"; query.order = "asc"; }
  if (filters.sort === "price-desc") { query.sort = "price.amount"; query.order = "desc"; }

  const { data, isLoading } = useContentList(resource, query);
  const items = data?.data || [];
  const pages = data?.pagination?.pages || 1;

  const update = (patch) => setFilters((f) => ({ ...f, page: 1, ...patch }));

  return (
    <Container>
      <div className="grid gap-8 py-12 lg:grid-cols-[280px_1fr]">
        {/* Filters */}
        <aside className="space-y-5">
          <div className="card-base p-5 shadow-[var(--shadow-card)]">
            <h3 className="mb-4 text-lg font-bold text-ink">{t("common.filters")}</h3>
            <div className="space-y-4">
              <Input
                label={t("common.search")}
                placeholder={t("home.searchPlaceholder")}
                value={filters.search}
                onChange={(e) => update({ search: e.target.value })}
              />
              {showType && (
                <Select
                  label={lang === "bn" ? "ধরন" : "Type"}
                  value={filters.type}
                  onChange={(e) => update({ type: e.target.value })}
                >
                  <option value="">{lang === "bn" ? "সব" : "All"}</option>
                  {typeOptions.map((tp) => (
                    <option key={tp} value={tp}>{tp[0].toUpperCase() + tp.slice(1)}</option>
                  ))}
                </Select>
              )}
              <Input
                type="number"
                label={lang === "bn" ? "সর্বোচ্চ দাম (৳)" : "Max price (৳)"}
                placeholder="100000"
                value={filters.price_max}
                onChange={(e) => update({ price_max: e.target.value })}
              />
              <Button
                variant="outline"
                full
                onClick={() => setFilters({ search: "", type: "", price_max: "", sort: "", page: 1 })}
              >
                {t("common.clear")}
              </Button>
            </div>
          </div>
        </aside>

        {/* Results */}
        <div>
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm text-muted">
              {data?.pagination?.total ?? 0} {lang === "bn" ? "টি ফলাফল" : "results"}
            </p>
            <select
              className="input-base max-w-50"
              value={filters.sort}
              onChange={(e) => update({ sort: e.target.value })}
            >
              <option value="">{t("common.newest")}</option>
              <option value="price-asc">{t("common.priceLowHigh")}</option>
              <option value="price-desc">{t("common.priceHighLow")}</option>
            </select>
          </div>

          {isLoading ? (
            <SkeletonGrid count={6} />
          ) : items.length ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {items.map((p) => (
                <PackageCard key={p._id} item={p} basePath={basePath} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl bg-surface py-20 text-center text-muted">{t("common.noResults")}</div>
          )}

          {/* Pagination */}
          {pages > 1 && (
            <div className="mt-10 flex justify-center gap-2">
              {Array.from({ length: pages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setFilters((f) => ({ ...f, page: i + 1 }))}
                  className={`h-10 w-10 rounded-lg text-sm font-semibold transition ${
                    filters.page === i + 1 ? "bg-brand text-white" : "bg-white ring-1 ring-slate-200 hover:ring-brand"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
