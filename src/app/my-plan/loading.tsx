export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-6 lg:py-10">
      <div className="mb-6 h-4 w-32 animate-pulse rounded bg-card" />

      <div className="mb-6">
        <div className="mb-2 h-9 w-48 animate-pulse rounded bg-card" />
        <div className="h-4 w-72 animate-pulse rounded bg-card" />
      </div>

      <div className="mb-6 h-24 animate-pulse rounded-2xl border border-border bg-card" />

      <div className="mb-5 flex gap-2">
        <div className="h-9 w-32 animate-pulse rounded-full bg-card" />
        <div className="h-9 w-24 animate-pulse rounded-full bg-card" />
      </div>

      <div className="flex flex-col gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-28 animate-pulse rounded-2xl border border-border bg-card"
          />
        ))}
      </div>
    </div>
  );
}