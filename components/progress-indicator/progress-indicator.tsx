"use client";

import { type ReactNode, use } from "react";

import {
  ProgressIndicatorContext,
  type ProgressIndicatorState,
} from "./progress-indicator-context";

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

function Root({
  children,
  current,
  total,
}: {
  children: React.ReactNode;
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

Root.Label = Label;
Root.Items = Items;

export const ProgressIndicator = Root;
