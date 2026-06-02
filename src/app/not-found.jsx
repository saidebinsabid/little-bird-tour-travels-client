import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ display: "grid", placeItems: "center", minHeight: "100vh" }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: 48, margin: 0 }}>404</h1>
        <p>This page could not be found.</p>
        <Link href="/">Go home</Link>
      </div>
    </main>
  );
}
