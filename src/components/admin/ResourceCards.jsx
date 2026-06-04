"use client";

import Link from "next/link";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { resources } from "@/admin/resources";
import { buttonClasses } from "@/components/ui/Button";
import Icon from "@/components/icons/Icon";
import PackageCard from "@/components/packages/PackageCard";
import VisaCard from "@/components/visa/VisaCard";
import FareCard from "@/components/airticket/FareCard";
import { PageLoader } from "@/components/ui/Loading";

// The public-facing card for each resource, so admins see exactly what users see.
const CARD_BY_RESOURCE = {
  packages: PackageCard,
  hotels: PackageCard,
  visas: VisaCard,
  "air-tickets": FareCard,
};

// Admin list view rendered as the public cards (instead of a table), with edit +
// delete controls dropped into each card's corner.
export default function ResourceCards({ resourceKey }) {
  const cfg = resources[resourceKey];
  const Card = CARD_BY_RESOURCE[resourceKey] || PackageCard;
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: [resourceKey, "admin"],
    queryFn: async () => (await axiosSecure.get(`/${cfg.endpoint}`, { params: { limit: 100 } })).data,
  });

  if (!cfg) return <div className="text-muted">Unknown resource.</div>;
  const rows = data?.data || [];

  const remove = async (item) => {
    if (!confirm("Are you sure you want to delete this? This action cannot be undone.")) return;
    try {
      await axiosSecure.delete(`/${cfg.endpoint}/${item._id}`);
      toast.success("Deleted");
      qc.invalidateQueries({ queryKey: [resourceKey, "admin"] });
      qc.invalidateQueries({ queryKey: [cfg.endpoint] });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink">{cfg.label}</h1>
          <p className="text-sm text-muted">{rows.length} items</p>
        </div>
        <Link href={`/dashboard/admin/${resourceKey}/new`} className={buttonClasses({ variant: "primary" })}>
          <Icon name="grid" className="h-4 w-4" /> Add New
        </Link>
      </div>

      {isLoading ? (
        <PageLoader />
      ) : rows.length ? (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {rows.map((item) => (
            <Card
              key={item._id}
              item={item}
              href={`/dashboard/admin/${resourceKey}/${item._id}`}
              actions={
                <>
                  <Link
                    href={`/dashboard/admin/${resourceKey}/${item._id}`}
                    aria-label="Edit"
                    title="Edit"
                    className="grid h-9 w-9 place-items-center rounded-full bg-white/95 text-brand shadow-md transition hover:bg-white hover:scale-110"
                  >
                    <Icon name="edit" className="h-4 w-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => remove(item)}
                    aria-label="Delete"
                    title="Delete"
                    className="grid h-9 w-9 place-items-center rounded-full bg-white/95 text-red-600 shadow-md transition hover:bg-white hover:scale-110"
                  >
                    <Icon name="trash" className="h-4 w-4" />
                  </button>
                </>
              }
            />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl bg-surface py-20 text-center text-muted">
          No items yet — click “Add New”.
        </div>
      )}
    </div>
  );
}
