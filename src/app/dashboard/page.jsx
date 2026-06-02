"use client";

import useAuth from "@/hooks/useAuth";
import useUserRole from "@/hooks/useUserRole";
import { useSecureQuery } from "@/hooks/useSecureQuery";

function StatCard({ icon, label, value }) {
  return (
    <div className="card-base p-5 shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-light text-2xl">{icon}</span>
        <span className="text-3xl font-extrabold text-ink">{value ?? "—"}</span>
      </div>
      <p className="mt-3 text-sm text-muted">{label}</p>
    </div>
  );
}

export default function DashboardHome() {
  const { user } = useAuth();
  const { role } = useUserRole();
  const isStaff = ["admin", "super-admin", "agent"].includes(role);

  const { data: inquiries } = useSecureQuery("inquiries", "/inquiries", { limit: 1 }, { enabled: isStaff });
  const { data: bookings } = useSecureQuery("bookings", "/bookings", { limit: 1 }, { enabled: isStaff });
  const { data: myBookings } = useSecureQuery("my-bookings", "/bookings/me", {}, { enabled: !isStaff });

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">
        Welcome back, {user?.name || "traveler"} 👋
      </h1>
      <p className="mt-1 text-muted">
        {isStaff ? "Here's a quick snapshot of your business." : "Manage your bookings and inquiries here."}
      </p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {isStaff ? (
          <>
            <StatCard icon="📨" label="Total leads / inquiries" value={inquiries?.pagination?.total} />
            <StatCard icon="🧳" label="Total bookings" value={bookings?.pagination?.total} />
            <StatCard icon="👤" label="Your role" value={role} />
          </>
        ) : (
          <>
            <StatCard icon="🧳" label="My bookings" value={myBookings?.data?.length} />
            <StatCard icon="👤" label="Account" value={user?.email ? "Active" : "—"} />
          </>
        )}
      </div>
    </div>
  );
}
