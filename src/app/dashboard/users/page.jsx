"use client";

import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Badge from "@/components/ui/Badge";
import { PageLoader } from "@/components/ui/Loading";
import { formatDate } from "@/utils/format";

const ROLES = ["user", "agent", "admin", "super-admin"];

export default function UsersAdminPage() {
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["users", "admin"],
    queryFn: async () => (await axiosSecure.get("/users", { params: { limit: 100 } })).data,
  });
  const rows = data?.data || [];

  const setRole = async (id, role) => {
    try {
      await axiosSecure.patch(`/users/${id}/role`, { role });
      toast.success("Role updated");
      qc.invalidateQueries({ queryKey: ["users", "admin"] });
    } catch (e) { toast.error(e?.response?.data?.message || "Failed"); }
  };
  const del = async (id) => {
    if (!confirm("Delete user?")) return;
    try {
      await axiosSecure.delete(`/users/${id}`);
      toast.success("Deleted");
      qc.invalidateQueries({ queryKey: ["users", "admin"] });
    } catch { toast.error("Failed"); }
  };

  if (isLoading) return <PageLoader />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Users</h1>
      <p className="text-sm text-muted">{rows.length} users</p>
      <div className="mt-6 overflow-x-auto rounded-2xl bg-white shadow-[var(--shadow-card)] ring-1 ring-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-surface text-left text-muted">
            <tr><th className="p-3">Name</th><th className="p-3">Email</th><th className="p-3">Role</th><th className="p-3">Joined</th><th className="p-3 text-right">Actions</th></tr>
          </thead>
          <tbody>
            {rows.map((u) => (
              <tr key={u._id} className="border-t border-slate-100">
                <td className="p-3 font-medium text-ink">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3"><Badge tone={u.role?.includes("admin") ? "brand" : "gray"}>{u.role}</Badge></td>
                <td className="p-3 text-muted">{formatDate(u.createdAt)}</td>
                <td className="p-3 text-right">
                  <select defaultValue={u.role} onChange={(e) => setRole(u._id, e.target.value)} className="mr-2 rounded border border-slate-300 px-2 py-1 text-xs">
                    {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                  <button onClick={() => del(u._id)} className="font-medium text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
