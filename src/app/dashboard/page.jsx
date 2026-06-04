"use client";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import useAuth from "@/hooks/useAuth";
import useUserRole from "@/hooks/useUserRole";
import { useSecureQuery } from "@/hooks/useSecureQuery";
import Icon from "@/components/icons/Icon";
import Badge from "@/components/ui/Badge";
import { formatPrice, formatDate } from "@/utils/format";

const PIE_COLORS = ["#15257d", "#fbbf24", "#0e7490", "#16a34a", "#dc2626", "#7c3aed", "#64748b"];
const STATUS_TONE = { new: "accent", "in-progress": "brand", converted: "green", closed: "gray" };

function StatCard({ icon, label, value, accent }) {
  return (
    <div className="card-base p-5 shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between">
        <span className={`grid h-12 w-12 place-items-center rounded-xl ${accent ? "bg-accent/15 text-accent-dark" : "bg-brand-light text-brand"}`}>
          <Icon name={icon} className="h-6 w-6" />
        </span>
        <span className="text-3xl font-extrabold text-ink">{value ?? "—"}</span>
      </div>
      <p className="mt-3 text-sm text-muted">{label}</p>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="card-base p-5 shadow-[var(--shadow-card)]">
      <h3 className="mb-4 font-bold text-ink">{title}</h3>
      <div className="h-64">{children}</div>
    </div>
  );
}

function countBy(arr, key) {
  const m = {};
  arr.forEach((x) => { const k = x[key] || "other"; m[k] = (m[k] || 0) + 1; });
  return m;
}

function StaffOverview({ name }) {
  const { data: inq } = useSecureQuery("inquiries", "/inquiries", { limit: 100 });
  const { data: bk } = useSecureQuery("bookings", "/bookings", { limit: 100 });

  const inquiries = inq?.data || [];
  const bookings = bk?.data || [];
  const leadsTotal = inq?.pagination?.total ?? inquiries.length;
  const bookingsTotal = bk?.pagination?.total ?? bookings.length;
  const revenue = bookings.reduce((s, b) => s + (Number(b.amount) || 0), 0);
  const newLeads = inquiries.filter((i) => i.status === "new").length;

  const byStatus = countBy(bookings, "status");
  const bookingChart = ["pending", "confirmed", "completed", "cancelled"].map((s) => ({
    name: s[0].toUpperCase() + s.slice(1),
    value: byStatus[s] || 0,
  }));
  const byType = countBy(inquiries, "type");
  const inquiryChart = Object.entries(byType).map(([name, value]) => ({ name, value }));

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Welcome back, {name} 👋</h1>
      <p className="mt-1 text-muted">Here&apos;s a snapshot of your business performance.</p>

      <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4">
        <StatCard icon="inbox" label="Total leads / inquiries" value={leadsTotal} />
        <StatCard icon="briefcase" label="Total bookings" value={bookingsTotal} />
        <StatCard icon="sell" label="Total booking value" value={formatPrice(revenue)} accent />
        <StatCard icon="star" label="New leads (pending)" value={newLeads} accent />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <ChartCard title="Bookings by status">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={bookingChart} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#64748b" }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: "#64748b" }} />
              <Tooltip />
              <Bar dataKey="value" fill="#15257d" radius={[6, 6, 0, 0]} maxBarSize={60} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Inquiries by type">
          {inquiryChart.length ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={inquiryChart} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {inquiryChart.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="grid h-full place-items-center text-muted">No data</div>
          )}
        </ChartCard>
      </div>

      {/* Recent inquiries */}
      <div className="mt-6 card-base p-5 shadow-[var(--shadow-card)]">
        <h3 className="mb-4 font-bold text-ink">Recent inquiries</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-muted">
              <tr><th className="pb-2">Date</th><th className="pb-2">Type</th><th className="pb-2">Name</th><th className="pb-2">Phone</th><th className="pb-2">Status</th></tr>
            </thead>
            <tbody>
              {inquiries.slice(0, 6).map((r) => (
                <tr key={r._id} className="border-t border-slate-100">
                  <td className="py-2 text-muted">{formatDate(r.createdAt)}</td>
                  <td className="py-2"><Badge tone="gray">{r.type}</Badge></td>
                  <td className="py-2 font-medium text-ink">{r.name}</td>
                  <td className="py-2">{r.phone}</td>
                  <td className="py-2"><Badge tone={STATUS_TONE[r.status] || "gray"}>{r.status}</Badge></td>
                </tr>
              ))}
              {!inquiries.length && <tr><td colSpan={5} className="py-6 text-center text-muted">No inquiries yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function CustomerOverview({ name, email }) {
  const { data: myBookings } = useSecureQuery("my-bookings", "/bookings/me", {});
  const rows = myBookings?.data || [];
  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Welcome back, {name || "traveler"} 👋</h1>
      <p className="mt-1 text-muted">Manage your bookings and inquiries here.</p>
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard icon="briefcase" label="My bookings" value={rows.length} />
        <StatCard icon="info" label="Account" value={email ? "Active" : "—"} accent />
      </div>
    </div>
  );
}

export default function DashboardHome() {
  const { user } = useAuth();
  const { role } = useUserRole();
  const isStaff = role === "super-admin";
  const name = user?.name || user?.email || "traveler";
  return isStaff ? <StaffOverview name={name} /> : <CustomerOverview name={user?.name} email={user?.email} />;
}
