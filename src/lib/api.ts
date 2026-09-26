import type { Workout } from "@/types/workout";

const BASE_URL = "https://api.api-store.workers.dev/api/fitlog";


export async function getAllWorkouts(): Promise<Workout[]> {
  const res = await fetch(BASE_URL, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch workouts: ${res.status}`);
  }

  return (await res.json()) as Workout[];
}


export async function getWorkoutById(
  id: string | number
): Promise<Workout | null> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    cache: "no-store",
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch workout ${id}: ${res.status}`);
  }

  return (await res.json()) as Workout;
}