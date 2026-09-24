"use client";

import type { PlanTab } from "@/types/plan";

interface PlanTabsProps {
  activeTab: PlanTab;
  onChange: (tab: PlanTab) => void;
  planCount: number;
  savedCount: number;
}

const PlanTabs = ({ activeTab, onChange, planCount, savedCount }: PlanTabsProps) => {
  const tabs: { id: PlanTab; label: string; count: number }[] = [
    { id: "today", label: "Today's Plan", count: planCount },
    { id: "saved", label: "Saved", count: savedCount },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={
            activeTab === tab.id
              ? "rounded-full bg-accent px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-black transition"
              : "rounded-full border border-border px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-gray-400 transition hover:border-accent/40 hover:text-white"
          }
        >
          {tab.label}
          {tab.count > 0 && (
            <span
              className={
                activeTab === tab.id
                  ? "ml-2 rounded-full bg-black/20 px-1.5 text-[10px]"
                  : "ml-2 rounded-full bg-border px-1.5 text-[10px]"
              }
            >
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default PlanTabs;