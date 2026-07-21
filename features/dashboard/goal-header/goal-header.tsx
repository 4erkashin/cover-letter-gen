import { Text, View } from "reshaped";

import { GOAL_TARGET, goalProgress } from "@/domain";
import CheckIcon from "@/ui/assets/check-icon.svg";

import { ProgressTracker } from "../progress-tracker";
import styles from "./goal-header.module.css";

type GoalHeaderProps = {
  count: number;
};

export function GoalHeader({ count }: GoalHeaderProps) {
  const { isReached } = goalProgress(count);

  return (
    <View align="center" direction="row" gap={3}>
      <Text color="neutral-faded" variant="body-3">
        {count}/{GOAL_TARGET} applications generated
      </Text>
      {isReached ? (
        <CheckIcon aria-label="Goal reached" className={styles.check} />
      ) : (
        <ProgressTracker count={count} variant="dots" />
      )}
    </View>
  );
}
