import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
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
    <div className="container mx-auto px-4 py-6 lg:py-10">
      {/* Back link */}
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-400 transition hover:text-accent"
      >
        <FiArrowLeft size={14} />
        Back to Library
      </Link>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        {/* Left — Image (sticky on desktop) */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="aspect-square overflow-hidden rounded-2xl border border-border bg-card">
            <Image
              src={workout.image}
              alt={workout.name}
              width={800}
              height={800}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>

        {/* Right — Content */}
        <div className="flex flex-col gap-5">
          {/* Title + Description */}
          <div>
            <h1 className="font-display text-2xl font-black uppercase leading-tight text-white sm:text-3xl lg:text-4xl">
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
                className="rounded-full bg-accent px-3 py-1 text-[11px] font-semibold text-black"
              >
                {muscle}
              </span>
            ))}
          </div>

          {/* Specs panel */}
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="divide-y divide-border">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-center justify-between gap-4 px-5 py-3.5"
                >
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    {spec.label}
                  </span>
                  <span className="text-right text-xs font-semibold text-white sm:text-[13px]">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div>
            <h2 className="mb-3 font-display text-sm font-bold uppercase tracking-wider text-white">
              Instructions
            </h2>
            <ol className="space-y-2.5">
              {workout.instructions.map((step, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-sm leading-relaxed text-gray-400"
                >
                  <span className="font-semibold text-gray-500">
                    {i + 1}.
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Actions */}
          <WorkoutActions workout={workout} />
        </div>
      </div>
    </div>
  );
}