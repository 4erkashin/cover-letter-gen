"use client";

import { classNames } from "reshaped";

import styles from "./progress.module.css";
import { useGoalContext } from "./root";

type GoalProgressProps = {
  /** Compact dots for Status; large segments for Banner. */
  variant?: "dots" | "segments";
};

export function GoalProgress({ variant = "dots" }: GoalProgressProps) {
  const { count, target } = useGoalContext();
  const firstInactiveIndex = Math.min(Math.max(count, 0), target);

  return (
    <div
      aria-label={`${firstInactiveIndex} of ${target}`}
      className={classNames(styles.root, styles[variant])}
      role="img"
    >
      {Array.from({ length: target }, (_, index) => (
        <span
          className={classNames(
            styles.step,
            index < firstInactiveIndex && styles.active,
          )}
          data-active={index < firstInactiveIndex ? "true" : "false"}
          data-progress-dot={variant === "dots" ? "true" : undefined}
          data-progress-segment={variant === "segments" ? "true" : undefined}
          key={index}
        />
      ))}
    </div>
  );
}
