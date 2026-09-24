import { Suspense } from "react";
import Banner from "@/components/home/Banner";
import WorkoutList from "@/components/home/WorkoutList";

export default function HomePage() {
  return (
    <>
      {/* Hero Banner */}
      <Banner />

      {/* Library Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="font-display text-3xl font-black uppercase tracking-wide text-white sm:text-4xl">
            The Library
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="rounded-2xl border border-border bg-card p-8 text-center text-gray-500">
              Loading workouts…
            </div>
          }
        >
          <WorkoutList />
        </Suspense>
      </section>
    </>
  );
}