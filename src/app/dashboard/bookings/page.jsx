"use client";

import useUserRole from "@/hooks/useUserRole";
import { useSecureQuery } from "@/hooks/useSecureQuery";
import { PageLoader } from "@/components/ui/Loading";
import Badge from "@/components/ui/Badge";
import { formatDate, priceLabel } from "@/utils/format";

const STATUS_TONE = { pending: "accent", confirmed: "brand", completed: "green", cancelled: "red" };
const PAY_TONE = { unpaid: "red", partial: "accent", paid: "green", refunded: "gray" };

export default function BookingsPage() {
  const { role } = useUserRole();
  const isStaff = role === "super-admin";
  const { data, isLoading } = useSecureQuery(
    "bookings-view",
    isStaff ? "/bookings" : "/bookings/me",
    isStaff ? { limit: 50 } : {}
  );
  const rows = data?.data || [];

  if (isLoading) return <PageLoader />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">{isStaff ? "All Bookings" : "My Bookings"}</h1>
      <p className="mt-1 text-muted">{rows.length} bookings</p>

      <div className="mt-6 overflow-x-auto rounded-2xl bg-white shadow-[var(--shadow-card)] ring-1 ring-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-surface text-left text-muted">
            <tr>
              <th className="p-3">Booking #</th>
              <th className="p-3">Item</th>
              <th className="p-3">Date</th>
              <th className="p-3">Pax</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3">Payment</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((b) => (
              <tr key={b._id} className="border-t border-slate-100">
                <td className="p-3 font-mono text-xs">{b.bookingNo}</td>
                <td className="p-3 font-medium text-ink">{b.itemTitle || b.itemType}</td>
                <td className="p-3 text-muted">{formatDate(b.travelDate || b.createdAt)}</td>
                <td className="p-3">{b.pax}</td>
                <td className="p-3">{priceLabel({ amount: b.amount, currency: b.currency })}</td>
                <td className="p-3"><Badge tone={STATUS_TONE[b.status] || "gray"}>{b.status}</Badge></td>
                <td className="p-3"><Badge tone={PAY_TONE[b.paymentStatus] || "gray"}>{b.paymentStatus}</Badge></td>
              </tr>
            ))}
            {!rows.length && (
              <tr><td colSpan={7} className="p-8 text-center text-muted">No bookings yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
