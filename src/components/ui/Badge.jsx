const tones = {
  brand: "bg-brand-light text-brand-dark",
  accent: "bg-amber-100 text-amber-700",
  green: "bg-green-100 text-green-700",
  gray: "bg-slate-100 text-slate-600",
  red: "bg-red-100 text-red-700",
};

export default function Badge({ tone = "brand", className = "", children }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
        tones[tone] || tones.brand
      } ${className}`}
    >
      {children}
    </span>
  );
}
