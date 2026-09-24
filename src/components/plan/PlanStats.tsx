"use client";

import { usePlan } from "@/context/PlanContext";
import type { PlanTab } from "@/types/plan";

interface PlanStatsProps {
  activeTab: PlanTab;
}

const PlanStats = ({ activeTab }: PlanStatsProps) => {
  const { todayPlan, saved } = usePlan();

  // Pick the list based on active tab
  const list = activeTab === "today" ? todayPlan : saved;

  const exercises = list.length;
  const minutes = list.reduce((sum, w) => sum + w.duration, 0);
  const calories = list.reduce((sum, w) => sum + w.caloriesBurned, 0);

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