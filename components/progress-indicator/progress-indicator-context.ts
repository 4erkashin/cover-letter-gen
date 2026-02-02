import { createContext } from "react";

export type ProgressIndicatorStatus = "completed" | "in-progress";

export interface ProgressIndicatorState {
  current: number;
  total: number;
  status: ProgressIndicatorStatus;
}

export const ProgressIndicatorContext =
  createContext<ProgressIndicatorState | null>(null);
