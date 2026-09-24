"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { usePlan } from "@/context/PlanContext";
import type { PlanTab, SortOption } from "@/types/plan";
import PlanStats from "@/components/plan/PlanStats";
import PlanTabs from "@/components/plan/PlanTabs";
import PlanCard from "@/components/plan/PlanCard";
import EmptyState from "@/components/plan/EmptyState";
import SortDropdown from "@/components/shared/SortDropdown";

export default function MyPlanPage() {
  const [activeTab, setActiveTab] = useState<PlanTab>("today");
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  const { todayPlan, saved } = usePlan();

  const currentList = activeTab === "today" ? todayPlan : saved;

  const sortedList = useMemo(() => {
    const list = [...currentList];
    switch (sortBy) {
      case "duration":
        return list.sort((a, b) => a.duration - b.duration);
      case "calories":
        return list.sort((a, b) => a.caloriesBurned - b.caloriesBurned);
      case "rating":
        return list.sort((a, b) => b.rating - a.rating);
      default:
        return list;
    }
  }, [currentList, sortBy]);

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

      {/* Header */}
      <div className="mb-6">
        <h1 className="font-display text-3xl font-black uppercase tracking-wide text-white sm:text-4xl">
          My Plan
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Stats — dynamic based on activeTab */}
      <div className="mb-6">
        <PlanStats activeTab={activeTab} />
      </div>

      {/* Tabs + Sort */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <PlanTabs
          activeTab={activeTab}
          onChange={setActiveTab}
          planCount={todayPlan.length}
          savedCount={saved.length}
        />
        <SortDropdown value={sortBy} onChange={setSortBy} />
      </div>

      {/* List or Empty */}
      {sortedList.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col gap-3">
          {sortedList.map((workout) => (
            <PlanCard key={workout.id} workout={workout} tab={activeTab} />
          ))}
        </div>
      )}
    </div>
  );
}