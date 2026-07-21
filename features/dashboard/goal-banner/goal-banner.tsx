import { Text, View } from "reshaped";

import { GOAL_TARGET, goalProgress } from "@/domain";

import { CreateNewButton } from "../create-new-button";
import { ProgressTracker } from "../progress-tracker";
import styles from "./goal-banner.module.css";

type GoalBannerProps = {
  count: number;
};

export function GoalBanner({ count }: GoalBannerProps) {
  const { isReached } = goalProgress(count);

  if (isReached) {
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
          <CreateNewButton size="large" />
        </View>
        <View align="center" gap={2}>
          <ProgressTracker count={count} variant="segments" />
          <Text color="neutral-faded" variant="body-3">
            {count} out of {GOAL_TARGET}
          </Text>
        </View>
      </View>
    </section>
  );
}
