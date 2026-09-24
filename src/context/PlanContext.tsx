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
  addToPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;
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

export function PlanProvider({ children }: { children: ReactNode }) {
  const [todayPlan, setTodayPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage when app mounts
  useEffect(() => {
    try {
      const planRaw = localStorage.getItem(PLAN_KEY);
      const savedRaw = localStorage.getItem(SAVED_KEY);
      if (planRaw) setTodayPlan(JSON.parse(planRaw));
      if (savedRaw) setSaved(JSON.parse(savedRaw));
    } catch (err) {
      console.error("Failed to load from localStorage:", err);
    }
    setHydrated(true);
  }, []);

  // Save plan to localStorage
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(PLAN_KEY, JSON.stringify(todayPlan));
    } catch (err) {
      console.error("Failed to save plan:", err);
    }
  }, [todayPlan, hydrated]);

  // Save saved list to localStorage
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
    } catch (err) {
      console.error("Failed to save saved list:", err);
    }
  }, [saved, hydrated]);

  const addToPlan = (workout: Workout) => {
    setTodayPlan((prev) => {
      if (prev.find((w) => w.id === workout.id)) return prev;
      if (prev.length >= MAX_PLAN) return prev;
      return [...prev, workout];
    });
  };

  const addToSaved = (workout: Workout) => {
    setSaved((prev) => {
      if (prev.find((w) => w.id === workout.id)) return prev;
      return [...prev, workout];
    });
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
  if (!ctx) {
    throw new Error("usePlan must be used inside PlanProvider");
  }
  return ctx;
}