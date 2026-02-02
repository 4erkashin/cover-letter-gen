import { createContext } from "react";

export interface ProgressIndicatorState {
  current: number;
  total: number;
}

export const ProgressIndicatorContext =
  createContext<ProgressIndicatorState | null>(null);
