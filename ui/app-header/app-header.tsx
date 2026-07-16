"use client";

import { View } from "reshaped";

import { useCoverLetters } from "@/features/persist-storage";
import { BrandLink } from "@/ui/brand-link";
import { GoalHeader } from "@/ui/goal-header";
import { HomeButton } from "@/ui/home-button";

export function AppHeader() {
  const { coverLetters } = useCoverLetters();

  return (
    <View
      as="header"
      direction="row"
      align="center"
      justify="space-between"
      gap={4}
      paddingBlock={4}
      width="100%"
    >
      <BrandLink />
      <View direction="row" align="center" gap={4}>
        <GoalHeader count={coverLetters.length} />
        <HomeButton />
      </View>
    </View>
  );
}
