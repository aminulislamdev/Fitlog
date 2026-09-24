"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import type { Workout } from "@/types/workout";

interface PlanContextValue {
  todayPlan: Workout[];
  saved: Workout[];
  addToPlan: (workout: Workout) => boolean;
  addToSaved: (workout: Workout) => boolean;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  isInPlan: (id: number) => boolean;
  isInSaved: (id: number) => boolean;
  clearPlan: () => void;
}

const PlanContext = createContext<PlanContextValue | null>(null);

const PLAN_KEY = "fitlog:plan";
const SAVED_KEY = "fitlog:saved";
const MAX_PLAN = 5;

/** Safe read from localStorage */
function readFromStorage(key: string): Workout[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as Workout[]) : [];
  } catch {
    return [];
  }
}

export function PlanProvider({ children }: { children: ReactNode }) {
  // Lazy initializer — runs once on client (SSR gets [])
  const [todayPlan, setTodayPlan] = useState<Workout[]>(() =>
    readFromStorage(PLAN_KEY)
  );
  const [saved, setSaved] = useState<Workout[]>(() =>
    readFromStorage(SAVED_KEY)
  );

  // Persist plan
  useEffect(() => {
    try {
      localStorage.setItem(PLAN_KEY, JSON.stringify(todayPlan));
    } catch (err) {
      console.error("Failed to save plan:", err);
    }
  }, [todayPlan]);

  // Persist saved
  useEffect(() => {
    try {
      localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
    } catch (err) {
      console.error("Failed to save saved list:", err);
    }
  }, [saved]);

  const addToPlan = (workout: Workout): boolean => {
    if (todayPlan.some((w) => w.id === workout.id)) return false;
    if (todayPlan.length >= MAX_PLAN) return false;
    setTodayPlan((prev) => [...prev, workout]);
    return true;
  };

  const addToSaved = (workout: Workout): boolean => {
    if (saved.some((w) => w.id === workout.id)) return false;
    setSaved((prev) => [...prev, workout]);
    return true;
  };

  const removeFromPlan = (id: number) => {
    setTodayPlan((prev) => prev.filter((w) => w.id !== id));
  };

  const removeFromSaved = (id: number) => {
    setSaved((prev) => prev.filter((w) => w.id !== id));
  };

  const isInPlan = (id: number) => todayPlan.some((w) => w.id === id);
  const isInSaved = (id: number) => saved.some((w) => w.id === id);

  const clearPlan = () => setTodayPlan([]);

  return (
    <PlanContext.Provider
      value={{
        todayPlan,
        saved,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        isInPlan,
        isInSaved,
        clearPlan,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used inside PlanProvider");
  return ctx;
}