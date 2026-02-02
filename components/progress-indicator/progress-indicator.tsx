"use client";

import { type ReactNode, use } from "react";

import {
  ProgressIndicatorContext,
  type ProgressIndicatorState,
} from "./progress-indicator-context";

function ProgressIndicatorLabel({
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

  const { total } = context;
  const current = Math.min(context.current, total);

  return <>{children({ current, total })}</>;
}

function ProgressIndicatorRoot({
  children,
  current,
  total,
}: {
  children: React.ReactNode;
  current: number;
  total: number;
}) {
  return (
    <ProgressIndicatorContext.Provider value={{ current, total }}>
      {children}
    </ProgressIndicatorContext.Provider>
  );
}

ProgressIndicatorRoot.Label = ProgressIndicatorLabel;

export const ProgressIndicator = ProgressIndicatorRoot;
