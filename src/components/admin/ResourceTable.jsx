"use client";

import Link from "next/link";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { resources } from "@/admin/resources";
import { buttonClasses } from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Icon from "@/components/icons/Icon";
import { PageLoader } from "@/components/ui/Loading";

function cell(item, key, fields) {
  const f = fields.find((x) => x.name === key);
  const v = item[key];
  if (!f) return String(v ?? "—");
  if (f.type === "i18n") return v?.en || "—";
  if (f.type === "price") return v?.amount != null ? `${v.currency || "৳"} ${v.amount}` : "—";
  if (f.type === "boolean") return v ? "✓" : "—";
  return String(v ?? "—");
}

const FLAG_COLS = ["status", "active", "popular", "featured"];

export default function ResourceTable({ resourceKey }) {
  const cfg = resources[resourceKey];
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: [resourceKey, "admin"],
    queryFn: async () => (await axiosSecure.get(`/${cfg.endpoint}`, { params: { limit: 100 } })).data,
  });

  if (!cfg) return <div className="text-muted">Unknown resource.</div>;
  const rows = data?.data || [];

  const remove = async (item) => {
    if (!confirm("Delete this item?")) return;
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
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl bg-white shadow-[var(--shadow-card)] ring-1 ring-slate-200">
          <table className="w-full text-sm">
            <thead className="bg-surface text-left text-muted">
              <tr>
                {cfg.listColumns.map((c) => <th key={c} className="p-3 capitalize">{c}</th>)}
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((item) => (
                <tr key={item._id} className="border-t border-slate-100">
                  {cfg.listColumns.map((c) => (
                    <td key={c} className="p-3">
                      {FLAG_COLS.includes(c)
                        ? <Badge tone={item[c] === "published" || item[c] === true ? "green" : "gray"}>{cell(item, c, cfg.fields)}</Badge>
                        : <span className="text-ink">{cell(item, c, cfg.fields)}</span>}
                    </td>
                  ))}
                  <td className="p-3 text-right">
                    <Link href={`/dashboard/admin/${resourceKey}/${item._id}`} className="mr-3 font-medium text-brand hover:underline">Edit</Link>
                    <button onClick={() => remove(item)} className="font-medium text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
              {!rows.length && (
                <tr><td colSpan={cfg.listColumns.length + 1} className="p-8 text-center text-muted">No items yet — click “Add New”.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
