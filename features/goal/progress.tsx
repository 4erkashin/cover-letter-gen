"use client";

import styles from "./progress.module.css";
import { useGoalContext } from "./root";

type GoalProgressProps = {
  /** Compact dots for Status; large segments for Banner. */
  variant?: "dots" | "segments";
};

export function GoalProgress({ variant = "dots" }: GoalProgressProps) {
  const { count, target } = useGoalContext();
  const filled = Math.min(Math.max(count, 0), target);

  return (
    <div
      aria-label={`${filled} of ${target}`}
      className={[styles.root, styles[variant]].filter(Boolean).join(" ")}
      role="img"
    >
      {Array.from({ length: target }, (_, index) => (
        <span
          className={[styles.step, index < filled ? styles.active : undefined]
            .filter(Boolean)
            .join(" ")}
          data-active={index < filled ? "true" : "false"}
          data-progress-dot={variant === "dots" ? "true" : undefined}
          data-progress-segment={variant === "segments" ? "true" : undefined}
          key={index}
        />
      ))}
    </div>
  );
}
