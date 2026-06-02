"use client";

import Icon from "@/components/icons/Icon";

// Bordered input with a leading icon + inline label (matches the reference).
// Pass `prefix` for the mobile +880 prefix, and toggle props for password show/hide.
export default function AuthField({
  icon,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  prefix,
  showToggle = false,
  toggled = false,
  onToggle,
  required,
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 transition focus-within:border-brand focus-within:bg-white">
      <Icon name={icon} className="h-5 w-5 shrink-0 text-slate-400" />
      <div className="min-w-0 flex-1">
        <label className="block text-[11px] font-medium text-slate-500">{label}</label>
        <div className="flex items-center gap-1">
          {prefix}
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className="w-full bg-transparent text-sm font-medium text-ink outline-none placeholder:font-normal placeholder:text-slate-400"
          />
        </div>
      </div>
      {showToggle && (
        <button type="button" onClick={onToggle} aria-label="Toggle password" className="shrink-0 text-slate-400 transition hover:text-brand">
          <Icon name={toggled ? "eyeOff" : "eye"} className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
