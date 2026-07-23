"use client";

import { View } from "reshaped";

import { useGoalContext } from "./root";

type GoalProgressProps = {
  /** Compact dots for Status; large segments for Banner. */
  variant?: "dots" | "segments";
};

export function GoalProgress({ variant = "dots" }: GoalProgressProps) {
  const { count, target } = useGoalContext();
  const firstInactiveIndex = Math.min(Math.max(count, 0), target);
  const isDots = variant === "dots";

  return (
    <View
      align="center"
      attributes={{
        "aria-label": `${firstInactiveIndex} of ${target}`,
        role: "img",
      }}
      direction="row"
      gap={isDots ? 1 : 2}
    >
      {Array.from({ length: target }, (_, index) => {
        const active = index < firstInactiveIndex;

        return (
          <View
            attributes={{
              "aria-hidden": true,
              ...(active && {
                style: {
                  backgroundColor: "var(--rs-color-foreground-neutral)",
                },
              }),
            }}
            backgroundColor={active ? undefined : "neutral-faded"}
            borderRadius="small"
            height={2}
            key={index}
            width={isDots ? 2 : 8}
          />
        );
      })}
    </View>
  );
}
