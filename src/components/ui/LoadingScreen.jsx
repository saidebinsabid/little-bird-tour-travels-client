"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const NAME = "Little Bird Travels";
const BLUE = "#15257d"; // brand blue
// A complete airplane as ONE continuous path (Material "flight") → a single,
// smooth self-drawing stroke with no corners to jump on.
const PLANE = "M21 16v-2l-8-5V3.5C13 2.67 12.33 2 11.5 2S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z";

// White-canvas loading screen: a complete airplane draws itself smoothly, the
// name (Teko font) sits below, and a thick highlighted progress bar fills with
// a small airplane gliding left→right above it. Everything is GSAP-driven and
// uses GPU-friendly transforms so it never stutters.
export default function LoadingScreen({ duration = 3200, onDone }) {
  const root = useRef(null);
  const pct = useRef(null);
  const scene = useRef(null);
  const played = useRef(false);
  const [phase, setPhase] = useState("show"); // show → fade → gone

  // GSAP scene — guarded so React Strict Mode can't double-run it (the old shake)
  useEffect(() => {
    if (played.current) return;
    played.current = true;
    scene.current = gsap.context(() => {
      // Draw the complete airplane in one smooth stroke, then fill it
      const plane = root.current.querySelector(".ls-plane");
      const len = plane.getTotalLength();
      gsap.set(plane, { strokeDasharray: len, strokeDashoffset: len, fillOpacity: 0 });
      gsap.timeline()
        .to(plane, { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut" })
        .to(plane, { fillOpacity: 1, duration: 0.5, ease: "power1.out" }, "-=0.25");

      // Airplane rides the bar's filling edge — left → right, in sync with it
      const fly = root.current.querySelector(".ls-fly");
      const w = fly.parentElement.offsetWidth;
      gsap.fromTo(fly, { x: 0, rotation: 90 }, { x: w - 14, rotation: 90, duration: duration / 1000, ease: "power1.inOut" });

      // Thick bar fills + live percentage
      gsap.fromTo(".ls-bar", { width: "0%" }, { width: "100%", duration: duration / 1000, ease: "power1.inOut" });
      const c = { v: 0 };
      gsap.to(c, {
        v: 100,
        duration: duration / 1000,
        ease: "power1.inOut",
        onUpdate: () => { if (pct.current) pct.current.textContent = Math.round(c.v) + "%"; },
      });
    }, root);
    return () => {}; // never revert here — avoids the Strict-Mode snap
  }, [duration]);

  // Lifecycle: fade out, kill tweens, unmount
  useEffect(() => {
    const tFade = setTimeout(() => setPhase("fade"), duration);
    const tGone = setTimeout(() => { scene.current?.kill?.(); setPhase("gone"); onDone?.(); }, duration + 550);
    return () => { clearTimeout(tFade); clearTimeout(tGone); };
  }, [duration, onDone]);

  if (phase === "gone") return null;

  return (
    <div
      ref={root}
      role="status"
      aria-label="Loading"
      className={`fixed inset-0 z-[100] grid place-items-center bg-white transition-opacity duration-500 ${phase === "fade" ? "opacity-0" : "opacity-100"}`}
    >
      <div className="flex flex-col items-center">
        {/* ── Complete airplane (draws itself) ── */}
        <svg viewBox="0 0 24 24" className="h-32 w-32" aria-hidden="true">
          <path
            className="ls-plane"
            d={PLANE}
            fill={BLUE}
            stroke={BLUE}
            strokeWidth="0.6"
            strokeLinejoin="round"
            strokeLinecap="round"
            style={{ strokeDasharray: 200, strokeDashoffset: 200, fillOpacity: 0 }}
          />
        </svg>

        {/* ── Website name (Teko font, words drift apart) ── */}
        <div
          className="ls-name font-display mt-6 flex items-center justify-center gap-x-3 whitespace-nowrap text-4xl font-bold md:text-5xl"
          style={{ color: BLUE }}
        >
          {NAME.split(" ").map((word, wi) => (
            <span key={wi} className="flex">
              {word.split("").map((ch, i) => (
                <span key={`${wi}-${i}`} className="inline-block">{ch}</span>
              ))}
            </span>
          ))}
        </div>

        {/* ── Progress: flying plane + thick highlighted bar ── */}
        <div className="mt-7 w-72">
          <div className="mb-1.5 flex items-center justify-between text-xs font-semibold" style={{ color: BLUE }}>
            <span>Loading</span>
            <span ref={pct}>0%</span>
          </div>

          {/* airplane gliding above the bar */}
          <div className="relative mb-1.5 h-5 w-full overflow-hidden">
            <svg className="ls-fly absolute left-0 top-1 h-3.5 w-3.5 will-change-transform" viewBox="0 0 24 24" fill={BLUE} aria-hidden="true">
              <path d={PLANE} />
            </svg>
          </div>

          {/* thick, highlighted progress bar */}
          <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200/80 shadow-inner">
            <div
              className="ls-bar h-full w-0 rounded-full shadow-[0_0_14px_rgba(37,99,235,0.7)]"
              style={{ background: "linear-gradient(90deg, #15257d, #3b82f6)" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
