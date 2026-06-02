// Read-only star rating. value 0–5 (supports .5 visually by rounding).
export default function Rating({ value = 0, className = "" }) {
  const full = Math.round(value);
  return (
    <span className={`inline-flex items-center gap-0.5 text-amber-400 ${className}`} aria-label={`${value} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`h-4 w-4 ${i < full ? "fill-current" : "fill-slate-200"}`}
        >
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 15.9 4.8 17.6l1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}
