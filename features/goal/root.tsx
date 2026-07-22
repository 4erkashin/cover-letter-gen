"use client";

import { createContext, type ReactNode, useContext } from "react";

import { type GOAL_TARGET, goalProgress } from "@/domain";
import { useCoverLetters } from "@/features/persist-storage";

type GoalContextValue = {
  count: number;
  isLoading: boolean;
  isReached: boolean;
  target: typeof GOAL_TARGET;
};

const GoalContext = createContext<GoalContextValue | null>(null);

type GoalRootProps = {
  children: ReactNode;
};

export function useGoalContext(): GoalContextValue {
  const value = useContext(GoalContext);
  if (!value) {
    throw new Error("Goal parts must be used within Goal.Root");
  }
  return value;
}

export function GoalRoot({ children }: GoalRootProps) {
  const { coverLetters, isLoading } = useCoverLetters();
  const progress = goalProgress(coverLetters.length);

  return (
    <GoalContext.Provider
      value={{
        count: progress.count,
        isLoading,
        isReached: progress.isReached,
        target: progress.target,
      }}
    >
      {children}
    </GoalContext.Provider>
  );
}
