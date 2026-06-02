// Centered or left-aligned section title with an optional eyebrow + subtitle.
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
  className = "",
}) {
  return (
    <div className={`${center ? "text-center mx-auto max-w-2xl" : ""} ${className}`}>
      {eyebrow && (
        <span className="inline-block text-sm font-semibold uppercase tracking-wider text-accent-dark">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-2 text-3xl md:text-4xl font-bold text-ink">{title}</h2>
      {subtitle && <p className="mt-3 text-body">{subtitle}</p>}
      <div
        className={`mt-4 h-1 w-20 rounded bg-accent ${center ? "mx-auto" : ""}`}
      />
    </div>
  );
}
