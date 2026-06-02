export function Spinner({ className = "" }) {
  return (
    <span
      className={`inline-block h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent ${className}`}
      aria-label="loading"
    />
  );
}

export function PageLoader() {
  return (
    <div className="grid place-items-center py-24 text-brand">
      <Spinner className="h-8 w-8" />
    </div>
  );
}

// Card-shaped shimmer placeholder for grids.
export function CardSkeleton() {
  return (
    <div className="card-base animate-pulse">
      <div className="h-48 w-full bg-slate-200" />
      <div className="space-y-3 p-4">
        <div className="h-4 w-3/4 rounded bg-slate-200" />
        <div className="h-3 w-1/2 rounded bg-slate-200" />
        <div className="h-8 w-full rounded bg-slate-200" />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
