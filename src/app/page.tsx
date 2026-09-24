"use client";

import { usePlan } from "@/context/PlanContext";

export default function HomePage() {
  const { todayPlan, saved } = usePlan();

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-black uppercase text-accent">
        Navbar + Footer Ready ✅
      </h1>
      <p className="mt-2 text-gray-400">
        Plan: {todayPlan.length} items | Saved: {saved.length} items
      </p>
    </div>
  );
}