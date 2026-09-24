import { getAllWorkouts } from "@/lib/api";
import WorkoutCard from "@/components/shared/WorkoutCard";
import type { Workout } from "@/types/workout";

const WorkoutList = async () => {
  let workouts: Workout[] = [];
  let error: string | null = null;

  try {
    workouts = await getAllWorkouts();
  } catch (err) {
    error = err instanceof Error ? err.message : "Unknown error";
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-center">
        <p className="text-red-400">⚠️ {error}</p>
      </div>
    );
  }

  if (workouts.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 text-center">
        <p className="text-gray-400">No workouts available.</p>
      </div>
    );
  }

  return (
    <div
      id="library"
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      {workouts.map((workout) => (
        <WorkoutCard key={workout.id} workout={workout} />
      ))}
    </div>
  );
};

export default WorkoutList;