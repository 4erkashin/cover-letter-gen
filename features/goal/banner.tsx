"use client";

import type { ReactNode } from "react";

import { Text, View } from "reshaped";

import styles from "./banner.module.css";
import { Indicator } from "./indicator";
import { GoalProgress } from "./progress";
import { useGoalContext } from "./root";

type GoalBannerProps = {
  action: ReactNode;
};

export function GoalBanner({ action }: GoalBannerProps) {
  const { count, isLoading, isReached, target } = useGoalContext();

  if (isLoading || isReached) {
    return null;
  }

  return (
    <section className={styles.root}>
      <View align="center" gap={8}>
        <View align="center" gap={4} maxWidth="120">
          <Text align="center" as="h2" variant="featured-3">
            Hit your goal
          </Text>
          <Text align="center" color="neutral-faded" variant="body-2">
            Generate and send out couple more job applications today to get
            hired faster
          </Text>
          {action}
        </View>
        <View align="center" gap={2}>
          <GoalProgress gap={2}>
            {(isFilled) => <Indicator.Dash isFilled={isFilled} />}
          </GoalProgress>
          <Text color="neutral-faded" variant="body-3">
            {count} out of {target}
          </Text>
        </View>
      </View>
    </section>
  );
}
