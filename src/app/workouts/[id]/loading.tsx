export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <div className="mb-6 h-4 w-32 animate-pulse rounded bg-card" />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Image skeleton */}
        <div className="aspect-square w-full animate-pulse rounded-2xl border border-border bg-card" />

        {/* Content skeleton */}
        <div className="space-y-6">
          <div>
            <div className="mb-3 h-8 w-3/4 animate-pulse rounded bg-card" />
            <div className="mb-2 h-4 w-full animate-pulse rounded bg-card" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-card" />
          </div>

          <div className="flex gap-2">
            <div className="h-6 w-16 animate-pulse rounded-full bg-card" />
            <div className="h-6 w-16 animate-pulse rounded-full bg-card" />
          </div>

          <div className="h-64 animate-pulse rounded-2xl border border-border bg-card" />

          <div className="flex gap-3">
            <div className="h-12 flex-1 animate-pulse rounded-full bg-card" />
            <div className="h-12 flex-1 animate-pulse rounded-full bg-card" />
          </div>
        </div>
      </div>
    </div>
  );
}