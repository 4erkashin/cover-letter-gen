"use client";

import { View } from "reshaped";

import { useCoverLetters } from "@/features/persist-storage";
import { BrandLink } from "@/ui/brand-link";
import { HomeButton } from "@/ui/home-button";

import { GoalHeader } from "../goal-header";
import styles from "./app-header.module.css";

export function AppHeader() {
  const { coverLetters } = useCoverLetters();

  return (
    <View
      align="center"
      as="header"
      className={styles.root}
      direction="row"
      gap={4}
      justify="space-between"
      paddingBlock={4}
      width="100%"
      wrap
    >
      <BrandLink />
      <View
        align="center"
        className={styles.actions}
        direction="row"
        gap={3}
        wrap
      >
        <GoalHeader count={coverLetters.length} />
        <HomeButton />
      </View>
    </View>
  );
}
