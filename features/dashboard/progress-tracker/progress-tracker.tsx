import { GOAL_TARGET } from "@/domain";

import styles from "./progress-tracker.module.css";

type ProgressTrackerProps = {
  count: number;
  /** Compact dots for GoalHeader; large segments for GoalBanner. */
  variant?: "dots" | "segments";
};

export function ProgressTracker({
  count,
  variant = "dots",
}: ProgressTrackerProps) {
  const filled = Math.min(Math.max(count, 0), GOAL_TARGET);

  return (
    <div
      aria-label={`${filled} of ${GOAL_TARGET}`}
      className={[styles.root, styles[variant]].filter(Boolean).join(" ")}
      role="img"
    >
      {Array.from({ length: GOAL_TARGET }, (_, index) => (
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
