"use client";

import { useState, useEffect } from "react";
import { useI18n } from "@/i18n/useI18n";
import logoMark from "@/assets/logo-mark.png";

const WORDS = {
  en: ["Tour Packages", "Hajj & Umrah", "Air Tickets", "Visa Services", "Hotels"],
  bn: ["ট্যুর প্যাকেজ", "হজ্জ ও উমরাহ", "বিমান টিকিট", "ভিসা সার্ভিস", "হোটেল"],
};

export default function AnimatedHeroText() {
  const { lang } = useI18n();
  const words = WORDS[lang] || WORDS.en;

  // Typewriter effect for the rotating word.
  const [text, setText] = useState("");
  const [wi, setWi] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wi % words.length];
    let timeout;
    if (!deleting && text === word) {
      timeout = setTimeout(() => setDeleting(true), 1400); // hold full word
    } else if (deleting && text === "") {
      setDeleting(false);
      setWi((w) => (w + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => setText((t) => (deleting ? word.slice(0, t.length - 1) : word.slice(0, t.length + 1))),
        deleting ? 45 : 95
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, wi, words]);

  return (
    <div className="animate-fade-up text-center text-white">
      <span className="inline-flex items-center gap-2.5 rounded-tl-2xl rounded-br-2xl rounded-tr-none rounded-bl-none bg-accent py-2 pl-2.5 pr-5 text-base font-bold text-brand-dark shadow-lg md:text-lg">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-white shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoMark.src} alt="" className="h-5 w-auto" />
        </span>
        {lang === "bn" ? "লিটল বার্ড ট্রাভেলস" : "Little Bird Travels"}
      </span>

      <h1 className="font-display text-outline mt-5 text-6xl font-bold leading-none md:text-8xl">
        {lang === "bn" ? "ঘুরে আসুন সারা বিশ্ব" : "Explore the World With Us"}
      </h1>

      <p className="mt-4 text-2xl font-semibold text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.85)] md:text-3xl">
        {lang === "bn" ? "আমরা সাজাই আপনার " : "We arrange your "}
        <span className="hero-word">{text}</span>
        <span className="ml-0.5 inline-block w-0.5 animate-pulse bg-accent align-middle" style={{ height: "1.1em" }} />
      </p>
    </div>
  );
}
