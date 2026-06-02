"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import useUserRole from "@/hooks/useUserRole";
import { resourceList } from "@/admin/resources";
import Logo from "@/components/layout/Logo";
import Icon from "@/components/icons/Icon";

const CUSTOMER_NAV = [
  { href: "/dashboard", label: "Overview", icon: "grid" },
  { href: "/dashboard/bookings", label: "My Bookings", icon: "briefcase" },
];
const ADMIN_NAV = [
  { href: "/dashboard", label: "Overview", icon: "grid" },
  { href: "/dashboard/inquiries", label: "Inquiries / Leads", icon: "inbox" },
  { href: "/dashboard/bookings", label: "Bookings", icon: "briefcase" },
  { group: "Content" },
  ...resourceList.map((r) => ({ href: `/dashboard/admin/${r.key}`, label: r.label, icon: r.icon })),
  { group: "Manage" },
  { href: "/dashboard/reviews", label: "Reviews", icon: "star" },
  { href: "/dashboard/users", label: "Users", icon: "users" },
  { href: "/dashboard/settings", label: "Site Settings", icon: "settings" },
];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { role } = useUserRole();
  const isStaff = ["admin", "super-admin", "agent"].includes(role);
  const nav = isStaff ? ADMIN_NAV : CUSTOMER_NAV;

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-white p-5 md:flex">
        <Logo />
        <nav className="mt-6 flex-1 space-y-0.5 overflow-y-auto pr-1">
          {nav.map((n, i) => {
            if (n.group) {
              return (
                <p key={`g-${i}`} className="px-3 pb-1 pt-4 text-xs font-semibold uppercase tracking-wider text-muted">
                  {n.group}
                </p>
              );
            }
            const active = pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  active ? "bg-brand text-white" : "text-body hover:bg-brand-light"
                }`}
              >
                <Icon name={n.icon} className={`h-[18px] w-[18px] ${active ? "text-white" : "text-muted group-hover:text-brand"}`} />
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto border-t border-slate-100 pt-4">
          <p className="truncate text-sm font-semibold text-ink">{user?.name || user?.email}</p>
          <p className="text-xs capitalize text-muted">{role || "user"}</p>
          <button onClick={logout} className="mt-3 text-sm font-medium text-red-600 hover:underline">Logout</button>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3 md:hidden">
          <Logo />
          <button onClick={logout} className="text-sm font-medium text-red-600">Logout</button>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
