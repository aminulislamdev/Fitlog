import Image from "next/image";
import Link from "next/link";
import { FiClock, FiZap, FiStar } from "react-icons/fi";
import type { Workout } from "@/types/workout";

interface WorkoutCardProps {
  workout: Workout;
}

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:border-accent/40"
    >
      {/* Image */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-border">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Tag pills */}
        <div className="flex flex-wrap gap-1.5">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-black"
            >
              {muscle}
            </span>
          ))}
        </div>

        {/* Name */}
        <h3 className="font-display text-lg font-bold uppercase leading-tight text-white">
          {workout.name}
        </h3>

        {/* Equipment */}
        <p className="text-xs text-gray-500">{workout.equipment}</p>

        {/* Stats */}
        <div className="mt-auto flex items-center gap-4 border-t border-border pt-3 text-[11px] text-gray-400">
          <div className="flex items-center gap-1.5">
            <FiClock size={13} />
            <span>{workout.duration} min</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FiZap size={13} />
            <span>{workout.caloriesBurned} kcal</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FiStar size={13} />
            <span>{workout.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;