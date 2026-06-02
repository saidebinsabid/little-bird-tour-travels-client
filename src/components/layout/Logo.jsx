"use client";

import Link from "next/link";
import { useSettings } from "@/hooks/useContent";
import websiteLogo from "@/assets/website-logo.png";

/**
 * Sitewide logo. Uses the bundled brand logo (src/assets/website-logo.png) by
 * default; an uploaded logo in Site Settings (Cloudinary) overrides it.
 *
 * props:
 *   light — over a dark/transparent background → logo sits in a white chip so
 *           it stays crisp.
 */
export default function Logo({ light = false, onClick, className = "" }) {
  const { data: settings } = useSettings();
  const src = settings?.identity?.logo || websiteLogo.src;

  return (
    <Link href="/" onClick={onClick} className={`flex shrink-0 items-center ${className}`}>
      <span className={light ? "rounded-xl bg-white/95 px-2 py-1 shadow-sm" : ""}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="Little Bird Travels" className="h-10 w-auto md:h-12" />
      </span>
    </Link>
  );
}
