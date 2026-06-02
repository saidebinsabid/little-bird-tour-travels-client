// Design-system PRIMITIVE. Domain-free, reused everywhere.
// `buttonClasses` is exported so <Link> can look identical to <Button>.

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed";

const variants = {
  primary: "bg-brand text-white hover:bg-brand-dark",
  accent: "bg-accent text-brand-dark font-bold hover:bg-accent-dark",
  outline: "border border-brand text-brand hover:bg-brand/5",
  white: "bg-white text-brand hover:bg-slate-100",
  ghost: "text-brand hover:bg-brand/5",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2.5",
  lg: "px-6 py-3 text-lg",
};

export function buttonClasses({ variant = "primary", size = "md", full = false } = {}) {
  return `${base} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${
    full ? "w-full" : ""
  }`;
}

export default function Button({
  variant = "primary",
  size = "md",
  full = false,
  className = "",
  ...props
}) {
  return (
    <button className={`${buttonClasses({ variant, size, full })} ${className}`} {...props} />
  );
}
