"use client";

import { useState } from "react";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { usePlan } from "@/context/PlanContext";
import type { PlanTab } from "@/types/plan";
import PlanStats from "@/components/plan/PlanStats";
import PlanTabs from "@/components/plan/PlanTabs";
import PlanCard from "@/components/plan/PlanCard";
import EmptyState from "@/components/plan/EmptyState";

export default function MyPlanPage() {
  const [activeTab, setActiveTab] = useState<PlanTab>("today");
  const { todayPlan, saved } = usePlan();

  const currentList = activeTab === "today" ? todayPlan : saved;

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

      {/* Stats */}
      <div className="mb-6">
        <PlanStats />
      </div>

      {/* Tabs */}
      <div className="mb-5">
        <PlanTabs
          activeTab={activeTab}
          onChange={setActiveTab}
          planCount={todayPlan.length}
          savedCount={saved.length}
        />
      </div>

      {/* List or Empty */}
      {currentList.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col gap-3">
          {currentList.map((workout) => (
            <PlanCard key={workout.id} workout={workout} tab={activeTab} />
          ))}
        </div>
      )}
    </div>
  );
}