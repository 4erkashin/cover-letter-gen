"use client";

import { Fragment, type ReactNode } from "react";
import { View, type ViewProps } from "reshaped";

import { useGoalContext } from "./root";

type GoalProgressProps = Omit<ViewProps, "children"> & {
  children: (isFilled: boolean) => ReactNode;
};

export function GoalProgress({ children, ...props }: GoalProgressProps) {
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
      gap={1}
      {...props}
    >
      {Array.from({ length: target }, (_, index) => (
        <Fragment key={index}>{children(index < firstInactiveIndex)}</Fragment>
      ))}
    </View>
  );
}
