import type { MuscleGroup } from "./muscle";
import type { Difficulty } from "./difficulty";

export interface Workout {
  id: number;
  name: string;
  image: string;
  muscleGroups: MuscleGroup[];
  equipment: string;
  difficulty: Difficulty;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}