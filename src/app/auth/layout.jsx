// Auth pages now share the public chrome (Navbar + Footer), with the sign-in /
// sign-up card centered on a light background between them.
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingContact from "@/components/layout/FloatingContact";

export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="grid flex-1 place-items-center bg-slate-100 px-4 pb-16 pt-24 md:pt-28">
        <div className="w-full max-w-md overflow-hidden rounded-2xl border-t-4 border-brand bg-white p-7 shadow-xl sm:p-9">
          {children}
        </div>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
}
