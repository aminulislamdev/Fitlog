import type { Workout } from "./workout";

export type PlanTab = "today" | "saved";

export type SortOption = "duration" | "calories" | "rating";

export interface PlanState {
  todayPlan: Workout[];
  saved: Workout[];
}

export interface PlanContextType extends PlanState {
  addToPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  isInPlan: (id: number) => boolean;
  isInSaved: (id: number) => boolean;
  clearPlan: () => void;
}