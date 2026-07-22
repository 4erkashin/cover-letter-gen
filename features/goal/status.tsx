"use client";

import { Text, View } from "reshaped";

import CheckIcon from "@/ui/assets/check-icon.svg";

import { GoalProgress } from "./progress";
import { useGoalContext } from "./root";
import styles from "./status.module.css";

export function GoalStatus() {
  const { count, isLoading, isReached, target } = useGoalContext();

  if (isLoading) {
    return (
      <View
        align="center"
        aria-busy="true"
        aria-label="Goal progress loading"
        direction="row"
        gap={3}
      >
        <span
          className={styles.skeletonLabel}
          data-testid="goal-status-skeleton"
        />
        <span className={styles.skeletonDots} />
      </View>
    );
  }

  return (
    <View align="center" direction="row" gap={3}>
      <Text color="neutral-faded" variant="body-1">
        {count}/{target} applications generated
      </Text>

      {isReached ? (
        <CheckIcon aria-label="Goal reached" className={styles.check} />
      ) : (
        <GoalProgress variant="dots" />
      )}
    </View>
  );
}
