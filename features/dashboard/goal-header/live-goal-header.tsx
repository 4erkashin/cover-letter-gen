"use client";

import { useCoverLetters } from "@/features/persist-storage";

import { GoalHeader } from "./goal-header";

export function LiveGoalHeader() {
  const { coverLetters } = useCoverLetters();

  return <GoalHeader count={coverLetters.length} />;
}
