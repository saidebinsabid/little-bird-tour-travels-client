"use client";

import { toast } from "react-toastify";
import { useSecureQuery, useSecureMutation } from "@/hooks/useSecureQuery";
import { PageLoader } from "@/components/ui/Loading";
import Badge from "@/components/ui/Badge";
import { formatDate } from "@/utils/format";

const STATUS_TONE = { new: "accent", "in-progress": "brand", converted: "green", closed: "gray" };

export default function InquiriesPage() {
  const { data, isLoading } = useSecureQuery("inquiries", "/inquiries", { limit: 50 });
  const mutation = useSecureMutation("inquiries");
  const rows = data?.data || [];

  const setStatus = async (id, status) => {
    try {
      await mutation.mutateAsync({ url: `/inquiries/${id}`, body: { status } });
      toast.success("Updated");
    } catch {
      toast.error("Update failed");
    }
  };

  if (isLoading) return <PageLoader />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Inquiries / Leads</h1>
      <p className="mt-1 text-muted">{rows.length} recent leads</p>

      <div className="mt-6 overflow-x-auto rounded-2xl bg-white shadow-[var(--shadow-card)] ring-1 ring-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-surface text-left text-muted">
            <tr>
              <th className="p-3">Date</th>
              <th className="p-3">Type</th>
              <th className="p-3">Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Subject</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r._id} className="border-t border-slate-100">
                <td className="p-3 text-muted">{formatDate(r.createdAt)}</td>
                <td className="p-3"><Badge tone="gray">{r.type}</Badge></td>
                <td className="p-3 font-medium text-ink">{r.name}</td>
                <td className="p-3"><a href={`tel:${r.phone}`} className="text-brand">{r.phone}</a></td>
                <td className="p-3 max-w-50 truncate">{r.subject || r.message}</td>
                <td className="p-3"><Badge tone={STATUS_TONE[r.status] || "gray"}>{r.status}</Badge></td>
                <td className="p-3">
                  <select
                    defaultValue={r.status}
                    onChange={(e) => setStatus(r._id, e.target.value)}
                    className="rounded border border-slate-300 px-2 py-1 text-xs"
                  >
                    <option value="new">new</option>
                    <option value="in-progress">in-progress</option>
                    <option value="converted">converted</option>
                    <option value="closed">closed</option>
                  </select>
                </td>
              </tr>
            ))}
            {!rows.length && (
              <tr><td colSpan={7} className="p-8 text-center text-muted">No inquiries yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
