"use client";

import { FiPlus, FiBookmark, FiCheck } from "react-icons/fi";
import { toast } from "react-toastify";
import { usePlan } from "@/context/PlanContext";
import type { Workout } from "@/types/workout";

interface WorkoutActionsProps {
  workout: Workout;
}

const MAX_PLAN = 5;

const WorkoutActions = ({ workout }: WorkoutActionsProps) => {
  const { addToPlan, addToSaved, isInPlan, isInSaved, todayPlan } = usePlan();

  const inPlan = isInPlan(workout.id);
  const inSaved = isInSaved(workout.id);
  const planFull = todayPlan.length >= MAX_PLAN;

  const handleAddToPlan = () => {
    if (inPlan) {
      toast.info("Already in today's plan");
      return;
    }
    if (planFull) {
      toast.warning("Today's plan is full (max 5 lifts)");
      return;
    }
    addToPlan(workout);
    toast.success("Added to today's plan");
  };

  const handleSave = () => {
    if (inSaved) {
      toast.info("Already saved");
      return;
    }
    addToSaved(workout);
    toast.success("Saved for later");
  };

  return (
    <div className="flex flex-row flex-wrap items-center justify-end gap-3">
      {/* Primary — Add to plan */}
      <button
        type="button"
        onClick={handleAddToPlan}
        disabled={inPlan || planFull}
        className={
          inPlan
            ? "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-accent/20 px-5 py-3 text-xs font-bold uppercase tracking-wide text-accent"
            : planFull
              ? "inline-flex cursor-not-allowed items-center justify-center gap-2 whitespace-nowrap rounded-full bg-card px-5 py-3 text-xs font-bold uppercase tracking-wide text-gray-500"
              : "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-accent px-5 py-3 text-xs font-bold uppercase tracking-wide text-black transition hover:bg-accent/90"
        }
      >
        {inPlan ? (
          <>
            <FiCheck size={15} />
            In Today&apos;s Plan
          </>
        ) : planFull ? (
          "Plan Full"
        ) : (
          <>
            <FiPlus size={15} />
            Add to today&apos;s plan
          </>
        )}
      </button>

      {/* Secondary — Save */}
      <button
        type="button"
        onClick={handleSave}
        disabled={inSaved}
        className={
          inSaved
            ? "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-accent/40 bg-accent/5 px-5 py-3 text-xs font-bold uppercase tracking-wide text-accent"
            : "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-border bg-transparent px-5 py-3 text-xs font-bold uppercase tracking-wide text-gray-300 transition hover:border-accent hover:text-accent"
        }
      >
        {inSaved ? (
          <>
            <FiCheck size={15} />
            Saved
          </>
        ) : (
          <>
            <FiBookmark size={15} />
            Save for later
          </>
        )}
      </button>
    </div>
  );
};

export default WorkoutActions;