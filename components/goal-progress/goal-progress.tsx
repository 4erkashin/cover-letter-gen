"use client";

import { type ReactNode, use } from "react";
import { Icon, View } from "reshaped";

import { ApplicationsContext } from "@/features/application";

import CheckIcon from "./check.svg";

export function GoalProgress({
  children,
}: {
  children: (item: { filled: boolean; index: number }) => ReactNode;
}) {
  const applicationsContext = use(ApplicationsContext);

  if (!applicationsContext) {
    throw new Error("GoalProgress must be used within ApplicationsProvider");
  }

  const progressStatus = applicationsContext.goal.status;

  if (progressStatus === "completed") {
    return (
      <View
        align="center"
        backgroundColor="positive-faded"
        borderRadius="circular"
        height={5}
        justify="center"
        width={5}
      >
        <Icon color="positive" size={2.5} svg={CheckIcon} />
      </View>
    );
  }

  const { current, total } = applicationsContext.goal;

  return (
    <>
      {Array.from({ length: total }, (_, index) =>
        children({ filled: index < current, index }),
      )}
    </>
  );
}

function Bar({ filled }: { filled: boolean; index?: number }) {
  return (
    <View
      backgroundColor={filled ? "black" : "neutral"}
      borderRadius="small"
      height={4}
      width={12}
    />
  );
}

function Dot({ filled }: { filled: boolean; index?: number }) {
  return (
    <View
      backgroundColor={filled ? "black" : "neutral"}
      borderRadius="circular"
      height={1.5}
      width={1.5}
    />
  );
}

GoalProgress.Bar = Bar;
GoalProgress.Dot = Dot;
