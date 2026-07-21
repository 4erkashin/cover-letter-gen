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
      as="header"
      direction="row"
      align="center"
      justify="space-between"
      gap={4}
      wrap
      paddingBlock={4}
      width="100%"
      className={styles.root}
    >
      <BrandLink />
      <View
        direction="row"
        align="center"
        gap={3}
        wrap
        className={styles.actions}
      >
        <GoalHeader count={coverLetters.length} />
        <HomeButton />
      </View>
    </View>
  );
}
