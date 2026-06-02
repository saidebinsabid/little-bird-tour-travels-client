"use client";

import SearchWidget from "./SearchWidget";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Bright sky + ocean background */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80')",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/15 via-transparent to-white/25" />

      <div className="container-x pt-36 pb-28 md:pt-44 md:pb-44">
        <SearchWidget />
      </div>
    </section>
  );
}
