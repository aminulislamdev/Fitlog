"use client";

import { usePlan } from "@/context/PlanContext";

const PlanStats = () => {
  const { todayPlan } = usePlan();

  const exercises = todayPlan.length;
  const minutes = todayPlan.reduce((sum, w) => sum + w.duration, 0);
  const calories = todayPlan.reduce((sum, w) => sum + w.caloriesBurned, 0);

  const stats = [
    { label: "Exercises", value: exercises },
    { label: "Minutes", value: minutes },
    { label: "Calories", value: calories },
  ];

  return (
    <div className="grid grid-cols-3 divide-x divide-border overflow-hidden rounded-2xl border border-border bg-card">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center justify-center gap-1 px-3 py-5 sm:py-6"
        >
          <span className="font-display text-2xl font-black text-accent sm:text-3xl">
            {stat.value}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 sm:text-[11px]">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default PlanStats;