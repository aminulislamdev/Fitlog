"use client";

import Image from "next/image";
import Link from "next/link";
import { FiClock, FiZap, FiStar, FiEye, FiCheckCircle, FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import { usePlan } from "@/context/PlanContext";
import type { Workout } from "@/types/workout";
import type { PlanTab } from "@/types/plan";

interface PlanCardProps {
  workout: Workout;
  tab: PlanTab;
}

const PlanCard = ({ workout, tab }: PlanCardProps) => {
  const { removeFromPlan, removeFromSaved, addToPlan, isInPlan, todayPlan } =
    usePlan();

  const inPlan = isInPlan(workout.id);
  const planFull = todayPlan.length >= 5;

  const handleRemove = () => {
    if (tab === "today") {
      removeFromPlan(workout.id);
      toast.success("Removed from today's plan");
    } else {
      removeFromSaved(workout.id);
      toast.success("Removed from saved");
    }
  };

  const handleMarkDone = () => {
    toast.success(`"${workout.name}" marked as done 💪`);
  };

  const handleMoveToPlan = () => {
    if (inPlan) {
      toast.info("Already in today's plan");
      return;
    }
    if (planFull) {
      toast.warning("Today's plan is full (max 5 lifts)");
      return;
    }
    addToPlan(workout);
    toast.success("Moved to today's plan");
  };

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-3 sm:flex-row sm:items-center sm:p-4">
      {/* Thumbnail */}
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-border sm:h-24 sm:w-24">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="96px"
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2">
        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wide text-white sm:text-base">
            {workout.name}
          </h3>
          <p className="text-[11px] text-gray-500">{workout.equipment}</p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-[11px] text-gray-400">
          <div className="flex items-center gap-1.5">
            <FiClock size={12} />
            <span>{workout.duration} min</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FiZap size={12} />
            <span>{workout.caloriesBurned} kcal</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FiStar size={12} />
            <span>{workout.rating}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
        <Link
          href={`/workouts/${workout.id}`}
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-300 transition hover:border-accent hover:text-accent"
        >
          <FiEye size={12} />
          View Details
        </Link>

        {tab === "saved" ? (
          <button
            type="button"
            onClick={handleMoveToPlan}
            disabled={inPlan || planFull}
            className={
              inPlan
                ? "inline-flex cursor-not-allowed items-center gap-1.5 rounded-full bg-accent/20 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-accent"
                : "inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-black transition hover:bg-accent/90"
            }
          >
            <FiCheckCircle size={12} />
            {inPlan ? "In Plan" : "Move to Plan"}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleMarkDone}
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-black transition hover:bg-accent/90"
          >
            <FiCheckCircle size={12} />
            Mark as Done
          </button>
        )}

        <button
          type="button"
          onClick={handleRemove}
          aria-label="Remove"
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-gray-500 transition hover:border-red-500/50 hover:text-red-400"
        >
          <FiX size={14} />
        </button>
      </div>
    </div>
  );
};

export default PlanCard;