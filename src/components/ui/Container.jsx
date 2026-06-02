// Page width wrapper. Use around every section's content.
export default function Container({ className = "", children }) {
  return <div className={`container-x ${className}`}>{children}</div>;
}
