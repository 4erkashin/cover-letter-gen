"use client";

import { type ReactNode, use } from "react";
import { Icon, View } from "reshaped";

import CheckIcon from "./check.svg";
import {
  ProgressIndicatorContext,
  type ProgressIndicatorState,
} from "./progress-indicator-context";

function Root({
  children,
  current,
  total,
}: {
  children: ReactNode;
  current: number;
  total: number;
}) {
  return (
    <ProgressIndicatorContext.Provider
      value={{
        current: Math.min(current, total),
        status: current >= total ? "completed" : "in-progress",
        total,
      }}
    >
      {children}
    </ProgressIndicatorContext.Provider>
  );
}

function Label({
  children,
}: {
  children: ({ current, total }: ProgressIndicatorState) => ReactNode;
}) {
  const context = use(ProgressIndicatorContext);

  if (!context) {
    throw new Error(
      "ProgressIndicator.Label must be used within ProgressIndicator",
    );
  }

  return <>{children(context)}</>;
}

function Items({
  children,
}: {
  children: (item: { filled: boolean; index: number }) => ReactNode;
}) {
  const context = use(ProgressIndicatorContext);

  if (!context) {
    throw new Error(
      "ProgressIndicator.Items must be used within ProgressIndicator",
    );
  }

  const { current, status, total } = context;

  if (status === "completed") {
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
      backgroundColor={filled ? "black" : "neutral-faded"}
      borderRadius="small"
      height={4}
      width={12}
    />
  );
}

function Dot({ filled }: { filled: boolean; index?: number }) {
  return (
    <View
      backgroundColor={filled ? "black" : "neutral-faded"}
      borderRadius="circular"
      height={1.5}
      width={1.5}
    />
  );
}

Root.Bar = Bar;
Root.Dot = Dot;
Root.Items = Items;
Root.Label = Label;

export const ProgressIndicator = Root;
