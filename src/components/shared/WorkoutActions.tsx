"use client";

import { FiPlusCircle, FiBookmark, FiCheck } from "react-icons/fi";
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
    <div className="flex flex-col gap-3 sm:flex-row">
      {/* Primary — Add to plan */}
      <button
        type="button"
        onClick={handleAddToPlan}
        disabled={inPlan || planFull}
        className={
          inPlan
            ? "inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-accent/20 px-6 py-3 text-xs font-bold uppercase tracking-wider text-accent"
            : planFull
              ? "inline-flex flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-full bg-card px-6 py-3 text-xs font-bold uppercase tracking-wider text-gray-500"
              : "inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-xs font-bold uppercase tracking-wider text-black transition hover:bg-accent/90"
        }
      >
        {inPlan ? (
          <>
            <FiCheck size={16} />
            In Today&apos;s Plan
          </>
        ) : (
          <>
            <FiPlusCircle size={16} />
            {planFull ? "Plan Full" : "Add to Today's Plan"}
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
            ? "inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-accent/40 bg-accent/5 px-6 py-3 text-xs font-bold uppercase tracking-wider text-accent"
            : "inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-xs font-bold uppercase tracking-wider text-gray-300 transition hover:border-accent hover:text-accent"
        }
      >
        {inSaved ? (
          <>
            <FiCheck size={16} />
            Saved
          </>
        ) : (
          <>
            <FiBookmark size={16} />
            Save for Later
          </>
        )}
      </button>
    </div>
  );
};

export default WorkoutActions;