import { Text, View } from "reshaped";

import { GOAL_TARGET, goalProgress } from "@/domain";
import { CreateNewButton } from "@/ui/create-new-button";
import { ProgressTracker } from "@/ui/progress-tracker";

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
      <View gap={8} align="center">
        <View gap={4} align="center" maxWidth="120">
          <Text variant="featured-3" as="h2" align="center">
            Hit your goal
          </Text>
          <Text variant="body-2" color="neutral-faded" align="center">
            Generate and send out couple more job applications today to get
            hired faster
          </Text>
          <CreateNewButton size="large" />
        </View>
        <View gap={2} align="center">
          <ProgressTracker count={count} variant="segments" />
          <Text variant="body-3" color="neutral-faded">
            {count} out of {GOAL_TARGET}
          </Text>
        </View>
      </View>
    </section>
  );
}
