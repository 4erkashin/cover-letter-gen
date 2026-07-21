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
    <View direction="row" align="center" gap={3}>
      <Text variant="body-3" color="neutral-faded">
        {count}/{GOAL_TARGET} applications generated
      </Text>
      {isReached ? (
        <CheckIcon className={styles.check} aria-label="Goal reached" />
      ) : (
        <ProgressTracker count={count} variant="dots" />
      )}
    </View>
  );
}
