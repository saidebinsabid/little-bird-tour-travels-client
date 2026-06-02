"use client";

import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Rating from "@/components/ui/Rating";
import Badge from "@/components/ui/Badge";
import { PageLoader } from "@/components/ui/Loading";
import { formatDate } from "@/utils/format";

const TONE = { approved: "green", pending: "accent", rejected: "red" };

export default function ReviewsAdminPage() {
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["reviews", "all"],
    queryFn: async () => (await axiosSecure.get("/reviews/all")).data,
  });
  const rows = data?.data || [];

  const act = async (id, status) => {
    try {
      await axiosSecure.patch(`/reviews/${id}`, { status });
      toast.success("Updated");
      qc.invalidateQueries({ queryKey: ["reviews", "all"] });
    } catch { toast.error("Failed"); }
  };
  const del = async (id) => {
    if (!confirm("Delete review?")) return;
    try {
      await axiosSecure.delete(`/reviews/${id}`);
      toast.success("Deleted");
      qc.invalidateQueries({ queryKey: ["reviews", "all"] });
    } catch { toast.error("Failed"); }
  };

  if (isLoading) return <PageLoader />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Reviews</h1>
      <p className="text-sm text-muted">{rows.length} reviews</p>
      <div className="mt-6 space-y-3">
        {rows.map((r) => (
          <div key={r._id} className="card-base flex flex-col gap-3 p-4 shadow-[var(--shadow-card)] md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Rating value={r.rating} />
                <Badge tone={TONE[r.status] || "gray"}>{r.status}</Badge>
                <span className="text-xs text-muted">{formatDate(r.createdAt)}</span>
              </div>
              <p className="mt-1 text-body">“{r.comment}”</p>
              <p className="text-xs text-muted">— {r.author?.name} ({r.refType})</p>
            </div>
            <div className="flex shrink-0 gap-2">
              {r.status !== "approved" && <button onClick={() => act(r._id, "approved")} className="rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium text-white">Approve</button>}
              {r.status !== "rejected" && <button onClick={() => act(r._id, "rejected")} className="rounded-lg bg-slate-200 px-3 py-1.5 text-sm font-medium text-body">Reject</button>}
              <button onClick={() => del(r._id)} className="rounded-lg px-3 py-1.5 text-sm font-medium text-red-600">Delete</button>
            </div>
          </div>
        ))}
        {!rows.length && <p className="text-muted">No reviews yet.</p>}
      </div>
    </div>
  );
}
