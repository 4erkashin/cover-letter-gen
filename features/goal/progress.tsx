"use client";

import { Fragment, type ReactNode } from "react";
import { View } from "reshaped";

import { useGoalContext } from "./root";

type GoalProgressProps = {
  children: (active: boolean) => ReactNode;
  gap?: number;
};

export function GoalProgress({ children, gap = 1 }: GoalProgressProps) {
  const { count, target } = useGoalContext();
  const firstInactiveIndex = Math.min(Math.max(count, 0), target);

  return (
    <View
      align="center"
      attributes={{
        "aria-label": `${firstInactiveIndex} of ${target}`,
        role: "img",
      }}
      direction="row"
      gap={gap}
    >
      {Array.from({ length: target }, (_, index) => (
        <Fragment key={index}>{children(index < firstInactiveIndex)}</Fragment>
      ))}
    </View>
  );
}
