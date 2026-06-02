// Labeled form controls sharing the .input-base style. Text, textarea, select.

export function Input({ label, className = "", ...props }) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-medium text-body">{label}</span>}
      <input className={`input-base ${className}`} {...props} />
    </label>
  );
}

export function Textarea({ label, className = "", rows = 4, ...props }) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-medium text-body">{label}</span>}
      <textarea rows={rows} className={`input-base ${className}`} {...props} />
    </label>
  );
}

export function Select({ label, className = "", children, ...props }) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-medium text-body">{label}</span>}
      <select className={`input-base ${className}`} {...props}>
        {children}
      </select>
    </label>
  );
}
