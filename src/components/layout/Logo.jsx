"use client";

import Link from "next/link";
import { useSettings } from "@/hooks/useContent";
import websiteLogo from "@/assets/website-logo.png";

/**
 * Sitewide logo.
 *   light = true  → over a dark/transparent background (hero navbar, footer):
 *                   sits in a soft white rounded chip so it stays crisp.
 *   light = false → over a solid white background (scrolled navbar, dashboard):
 *                   no chip — the logo reads as if it's directly on the bar.
 */
export default function Logo({ light = false, onClick, className = "" }) {
  const { data: settings } = useSettings();
  const src = settings?.identity?.logo || websiteLogo.src;

  return (
    <Link href="/" onClick={onClick} className={`flex shrink-0 items-center ${className}`}>
      <span className={light ? "rounded-2xl bg-white p-1.5 shadow-sm" : ""}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="Little Bird Travels" className="h-12 w-auto md:h-14" />
      </span>
    </Link>
  );
}
