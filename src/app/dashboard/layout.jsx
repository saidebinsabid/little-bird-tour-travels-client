"use client";

import { useState, useEffect } from "react";
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
const STAFF_TOP = [
  { href: "/dashboard", label: "Overview", icon: "grid" },
  { href: "/dashboard/inquiries", label: "Inquiries / Leads", icon: "inbox" },
  { href: "/dashboard/bookings", label: "Bookings", icon: "briefcase" },
];
const STAFF_MANAGE = [
  { href: "/dashboard/reviews", label: "Reviews", icon: "star" },
  { href: "/dashboard/users", label: "Users", icon: "users" },
  { href: "/dashboard/settings", label: "Site Settings", icon: "settings" },
];

function GroupLabel({ children }) {
  return <p className="px-3 pb-1 pt-4 text-xs font-semibold uppercase tracking-wider text-muted">{children}</p>;
}

function NavLink({ href, label, icon, active }) {
  return (
    <Link
      href={href}
      className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
        active ? "bg-brand text-white" : "text-body hover:bg-brand-light"
      }`}
    >
      <Icon name={icon} className={`h-[18px] w-[18px] ${active ? "text-white" : "text-muted group-hover:text-brand"}`} />
      {label}
    </Link>
  );
}

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { role } = useUserRole();
  const isStaff = role === "super-admin";

  // Which content group is expanded (accordion). Auto-open the active one.
  const [open, setOpen] = useState(null);
  useEffect(() => {
    const m = pathname.match(/^\/dashboard\/admin\/([^/]+)/);
    if (m) setOpen(m[1]);
  }, [pathname]);

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-white p-5 md:flex">
        <Logo />

        <nav className="mt-6 flex-1 space-y-0.5 overflow-y-auto pr-1">
          {isStaff ? (
            <>
              {STAFF_TOP.map((n) => (
                <NavLink key={n.href} {...n} active={n.href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(n.href)} />
              ))}

              <GroupLabel>Content</GroupLabel>
              {resourceList.map((r) => {
                const base = `/dashboard/admin/${r.key}`;
                const activeGroup = pathname.startsWith(base);
                const isOpen = open === r.key;
                const onList = pathname === base;
                const onNew = pathname === `${base}/new`;
                return (
                  <div key={r.key}>
                    <button
                      onClick={() => setOpen(isOpen ? null : r.key)}
                      className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                        activeGroup ? "bg-brand-light text-brand" : "text-body hover:bg-brand-light"
                      }`}
                    >
                      <Icon name={r.icon} className={`h-[18px] w-[18px] ${activeGroup ? "text-brand" : "text-muted group-hover:text-brand"}`} />
                      <span className="flex-1 text-left">{r.label}</span>
                      <span className={`text-xs transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}>›</span>
                    </button>

                    {isOpen && (
                      <div className="ml-[22px] mt-0.5 space-y-0.5 border-l border-slate-200 pl-3">
                        <Link
                          href={base}
                          className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                            onList ? "bg-brand text-white" : "text-muted hover:text-brand"
                          }`}
                        >
                          <Icon name="grid" className="h-3.5 w-3.5" /> View All
                        </Link>
                        <Link
                          href={`${base}/new`}
                          className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                            onNew ? "bg-brand text-white" : "text-muted hover:text-brand"
                          }`}
                        >
                          <span className="text-sm leading-none">＋</span> Add New
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })}

              <GroupLabel>Manage</GroupLabel>
              {STAFF_MANAGE.map((n) => (
                <NavLink key={n.href} {...n} active={pathname.startsWith(n.href)} />
              ))}
            </>
          ) : (
            CUSTOMER_NAV.map((n) => (
              <NavLink key={n.href} {...n} active={n.href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(n.href)} />
            ))
          )}
        </nav>

        <div className="mt-4 rounded-2xl bg-surface p-3">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand text-sm font-bold text-white">
              {(user?.name || user?.email || "U")[0].toUpperCase()}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink">{user?.name || user?.email}</p>
              <p className="text-xs capitalize text-muted">{role === "super-admin" ? "Super Admin" : "User"}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-red-50 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
          >
            <Icon name="logout" className="h-4 w-4" /> Logout
          </button>
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
