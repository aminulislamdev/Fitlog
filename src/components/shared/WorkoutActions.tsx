"use client";

import { FiPlus, FiBookmark, FiCheck, FiAlertCircle } from "react-icons/fi";
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
    // Already in plan
    if (inPlan) {
      toast.warning("Already in today's plan", {
        icon: <FiAlertCircle />,
      });
      return;
    }
    // Plan full
    if (planFull) {
      toast.error(`Today's plan is full (max ${MAX_PLAN} lifts)`, {
        icon: <FiAlertCircle />,
      });
      return;
    }
    // Success
    addToPlan(workout);
    toast.success("Added to today's plan");
  };

  const handleSave = () => {
    // Already saved
    if (inSaved) {
      toast.warning("Already saved for later", {
        icon: <FiAlertCircle />,
      });
      return;
    }
    // Success
    addToSaved(workout);
    toast.success("Saved for later");
  };

  return (
    <div className="flex flex-row flex-wrap items-center justify-end gap-3">
      {/* Primary — Add to Plan */}
      <button
        type="button"
        onClick={handleAddToPlan}
        className={
          inPlan
            ? "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-accent/20 px-5 py-3 text-xs font-bold uppercase tracking-wide text-accent transition hover:bg-accent/30"
            : planFull
              ? "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-card px-5 py-3 text-xs font-bold uppercase tracking-wide text-gray-500 transition hover:bg-card/70"
              : "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-accent px-5 py-3 text-xs font-bold uppercase tracking-wide text-black transition hover:bg-accent/90"
        }
      >
        {inPlan ? (
          <>
            <FiCheck size={15} />
            In Today&apos;s Plan
          </>
        ) : planFull ? (
          <>
            <FiAlertCircle size={15} />
            Plan Full
          </>
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
        className={
          inSaved
            ? "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-accent/40 bg-accent/5 px-5 py-3 text-xs font-bold uppercase tracking-wide text-accent transition hover:bg-accent/10"
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