export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-10">
      {/* Header skeleton */}
      <div className="mb-8">
        <div className="mb-2 h-8 w-48 animate-pulse rounded bg-card" />
        <div className="h-4 w-64 animate-pulse rounded bg-card" />
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border border-border bg-card"
          >
            <div className="aspect-4/3 w-full animate-pulse bg-border" />
            <div className="space-y-3 p-4">
              <div className="flex gap-2">
                <div className="h-4 w-14 animate-pulse rounded-full bg-border" />
                <div className="h-4 w-14 animate-pulse rounded-full bg-border" />
              </div>
              <div className="h-5 w-3/4 animate-pulse rounded bg-border" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-border" />
              <div className="h-3 w-full animate-pulse rounded bg-border" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}