import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiClock, FiZap, FiStar } from "react-icons/fi";
import { getWorkoutById } from "@/lib/api";
import WorkoutActions from "@/components/shared/WorkoutActions";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function WorkoutDetailPage({ params }: PageProps) {
  const { id } = await params;
  const workout = await getWorkoutById(id);

  if (!workout) {
    notFound();
  }

  const specs = [
    { label: "Equipment", value: workout.equipment },
    { label: "Difficulty", value: workout.difficulty },
    { label: "Sets", value: String(workout.sets) },
    { label: "Reps", value: workout.reps },
    { label: "Duration", value: `${workout.duration} min` },
    { label: "Calories", value: `${workout.caloriesBurned} kcal` },
    { label: "Rating", value: String(workout.rating) },
  ];

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      {/* Back link */}
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-400 transition hover:text-accent"
      >
        <FiArrowLeft size={14} />
        Back to Library
      </Link>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Left — Image */}
        <div className="order-1">
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <Image
              src={workout.image}
              alt={workout.name}
              width={800}
              height={800}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </div>

        {/* Right — Content */}
        <div className="order-2 flex flex-col gap-6">
          {/* Title */}
          <div>
            <h1 className="font-display text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
              {workout.name}
            </h1>
            <p className="mt-3 text-sm text-gray-400 sm:text-base">
              {workout.description}
            </p>
          </div>

          {/* Muscle tags */}
          <div className="flex flex-wrap gap-2">
            {workout.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-black"
              >
                {muscle}
              </span>
            ))}
          </div>

          {/* Quick stats row (mobile view) */}
          <div className="flex items-center gap-5 border-y border-border py-3 text-xs text-gray-400">
            <div className="flex items-center gap-1.5">
              <FiClock size={14} />
              <span>{workout.duration} min</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FiZap size={14} />
              <span>{workout.caloriesBurned} kcal</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FiStar size={14} />
              <span>{workout.rating}</span>
            </div>
          </div>

          {/* Specs table */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="border-b border-border px-4 py-3">
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                Specs
              </h2>
            </div>
            <div className="divide-y divide-border">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-center justify-between px-4 py-3 text-sm"
                >
                  <span className="text-gray-500">{spec.label}</span>
                  <span className="font-semibold text-white">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <WorkoutActions workout={workout} />

          {/* Instructions */}
          <div>
            <h2 className="mb-4 font-display text-lg font-bold uppercase tracking-wide text-white">
              Instructions
            </h2>
            <ol className="space-y-3">
              {workout.instructions.map((step, i) => (
                <li
                  key={i}
                  className="flex gap-3 rounded-xl border border-border bg-card p-4 text-sm text-gray-300"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-black">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}