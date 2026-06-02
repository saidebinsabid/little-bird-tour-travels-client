import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";

export default function ForbiddenPage() {
  return (
    <main className="grid min-h-screen place-items-center p-6 text-center">
      <div>
        <p className="text-6xl">🚫</p>
        <h1 className="mt-4 text-3xl font-bold text-ink">403 — Forbidden</h1>
        <p className="mt-2 text-muted">You don&apos;t have permission to access this page.</p>
        <Link href="/" className={`mt-6 ${buttonClasses({ variant: "primary" })}`}>Go home</Link>
      </div>
    </main>
  );
}
