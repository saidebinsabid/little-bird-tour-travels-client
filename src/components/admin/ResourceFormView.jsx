"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { resources } from "@/admin/resources";
import ResourceForm from "./ResourceForm";
import { PageLoader } from "@/components/ui/Loading";

// Full-page create/edit form (replaces the old modal). When `id` is given it
// loads the item and pre-fills the same form used for creating.
export default function ResourceFormView({ resourceKey, id }) {
  const cfg = resources[resourceKey];
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const isEdit = Boolean(id);

  const { data: item, isLoading } = useQuery({
    queryKey: [resourceKey, "item", id],
    enabled: isEdit,
    queryFn: async () => (await axiosSecure.get(`/${cfg.endpoint}/${id}`)).data,
  });

  if (!cfg) return <div className="text-muted">Unknown resource.</div>;
  if (isEdit && isLoading) return <PageLoader />;

  const save = async (payload) => {
    setSaving(true);
    try {
      if (isEdit) {
        await axiosSecure.patch(`/${cfg.endpoint}/${id}`, payload);
        toast.success("Updated");
      } else {
        await axiosSecure.post(`/${cfg.endpoint}`, payload);
        toast.success("Created");
      }
      qc.invalidateQueries({ queryKey: [resourceKey, "admin"] });
      qc.invalidateQueries({ queryKey: [cfg.endpoint] });
      router.push(`/dashboard/admin/${resourceKey}`);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Save failed");
      setSaving(false);
    }
  };

  return (
    <div className="w-full">
      <Link href={`/dashboard/admin/${resourceKey}`} className="text-sm font-medium text-brand hover:underline">
        ← Back to {cfg.label}
      </Link>
      <h1 className="mt-2 text-2xl font-bold text-ink">
        {isEdit ? `Edit ${cfg.label}` : `New ${cfg.label}`}
      </h1>

      <div className="mt-6 rounded-2xl bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-slate-200">
        <ResourceForm
          fields={cfg.fields}
          initial={isEdit ? item : {}}
          onSubmit={save}
          submitting={saving}
        />
      </div>
    </div>
  );
}
