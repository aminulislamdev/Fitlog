import { Suspense } from "react";
import WorkoutList from "@/components/home/WorkoutList";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-10">
      {/* Section Header */}
      <div className="mb-8">
        <h2 className="font-display text-3xl font-black uppercase tracking-wide text-white sm:text-4xl">
          The Library
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {/* Library Grid */}
      <Suspense
        fallback={
          <div className="rounded-2xl border border-border bg-card p-8 text-center text-gray-500">
            Loading workouts…
          </div>
        }
      >
        <WorkoutList />
      </Suspense>
    </div>
  );
}