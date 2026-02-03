import { createContext } from "react";

export interface ProgressIndicatorState {
  current: number;
  status: ProgressIndicatorStatus;
  total: number;
}

export type ProgressIndicatorStatus = "completed" | "in-progress";

export const ProgressIndicatorContext =
  createContext<ProgressIndicatorState | null>(null);
