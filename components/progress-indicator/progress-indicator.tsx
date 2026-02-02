"use client";

import { type ReactNode, use } from "react";
import { View } from "reshaped";

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
      value={{ current: Math.min(current, total), total }}
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

  const { current, total } = context;

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
