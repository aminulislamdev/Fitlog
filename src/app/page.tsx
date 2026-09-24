import { getAllWorkouts } from "@/lib/api";
import WorkoutCard from "@/components/shared/WorkoutCard";
import type { Workout } from "@/types/workout";

export default async function HomePage() {
  let workouts: Workout[] = [];
  let error: string | null = null;

  try {
    workouts = await getAllWorkouts();
  } catch (err) {
    error = err instanceof Error ? err.message : "Unknown error";
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-10">
        <p className="text-red-400">⚠️ {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-6 font-display text-3xl font-black uppercase text-white">
        Card Test ✅
      </h1>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <WorkoutCard workout={workouts[0]} />
      </div>
    </div>
  );
}