import { getAllWorkouts } from "@/lib/api";

export default async function HomePage() {
  let count = 0;
  let error: string | null = null;

  try {
    const data = await getAllWorkouts();
    count = data.length;
  } catch (err) {
    error = err instanceof Error ? err.message : "Unknown error";
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-black uppercase text-accent">
        API Ready ✅
      </h1>
      {error ? (
        <p className="mt-2 text-red-400">Error: {error}</p>
      ) : (
        <p className="mt-2 text-gray-400">
          Fetched {count} workouts from API
        </p>
      )}
    </div>
  );
}