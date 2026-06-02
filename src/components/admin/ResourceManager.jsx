"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { resources } from "@/admin/resources";
import ResourceForm from "./ResourceForm";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { PageLoader } from "@/components/ui/Loading";

// Render a cell based on the field type declared in the resource config.
function cell(item, key, fields) {
  const f = fields.find((x) => x.name === key);
  const v = item[key];
  if (!f) return String(v ?? "—");
  if (f.type === "i18n") return v?.en || "—";
  if (f.type === "price") return v?.amount != null ? `${v.currency || "৳"} ${v.amount}` : "—";
  if (f.type === "boolean") return v ? "✓" : "—";
  return String(v ?? "—");
}

export default function ResourceManager({ resourceKey }) {
  const cfg = resources[resourceKey];
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();
  const [editing, setEditing] = useState(null); // item | "new" | null
  const [saving, setSaving] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: [resourceKey, "admin"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/${cfg.endpoint}`, { params: { limit: 100 } });
      return data;
    },
  });

  if (!cfg) return <div className="text-muted">Unknown resource.</div>;
  const rows = data?.data || [];

  const save = async (payload) => {
    setSaving(true);
    try {
      if (editing === "new") {
        await axiosSecure.post(`/${cfg.endpoint}`, payload);
        toast.success("Created");
      } else {
        await axiosSecure.patch(`/${cfg.endpoint}/${editing._id}`, payload);
        toast.success("Updated");
      }
      qc.invalidateQueries({ queryKey: [resourceKey, "admin"] });
      qc.invalidateQueries({ queryKey: [cfg.endpoint] }); // refresh public pages too
      setEditing(null);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (item) => {
    if (!confirm("Delete this item?")) return;
    try {
      await axiosSecure.delete(`/${cfg.endpoint}/${item._id}`);
      toast.success("Deleted");
      qc.invalidateQueries({ queryKey: [resourceKey, "admin"] });
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
        <Button onClick={() => setEditing("new")}>+ Add New</Button>
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
                      {c === "status" || c === "active" || c === "popular" || c === "featured"
                        ? <Badge tone={item[c] === "published" || item[c] === true ? "green" : "gray"}>{cell(item, c, cfg.fields)}</Badge>
                        : <span className="text-ink">{cell(item, c, cfg.fields)}</span>}
                    </td>
                  ))}
                  <td className="p-3 text-right">
                    <button onClick={() => setEditing(item)} className="mr-3 font-medium text-brand hover:underline">Edit</button>
                    <button onClick={() => remove(item)} className="font-medium text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
              {!rows.length && (
                <tr><td colSpan={cfg.listColumns.length + 1} className="p-8 text-center text-muted">No items yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Create / edit modal */}
      {editing && (
        <div className="fixed inset-0 z-50 grid place-items-start overflow-y-auto bg-black/50 p-4 py-10" onClick={() => !saving && setEditing(null)}>
          <div className="mx-auto w-full max-w-2xl rounded-2xl bg-white p-6" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-ink">{editing === "new" ? `New ${cfg.label}` : `Edit ${cfg.label}`}</h2>
              <button onClick={() => setEditing(null)} className="text-2xl text-muted hover:text-ink">×</button>
            </div>
            <ResourceForm
              fields={cfg.fields}
              initial={editing === "new" ? {} : editing}
              onSubmit={save}
              submitting={saving}
            />
          </div>
        </div>
      )}
    </div>
  );
}
