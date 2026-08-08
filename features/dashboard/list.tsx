"use client";

import type { ReactNode } from "react";

import { ErrorBoundary } from "react-error-boundary";
import { View } from "reshaped";

import { Button } from "@/ui/button";

import { useDashboardContext } from "./root";

function DashboardListLoading() {
  return <pre>loading</pre>;
}

function DashboardListEmpty() {
  return <pre>empty</pre>;
}

function DashboardListPopulated() {
  return <pre>populated</pre>;
}

function DashboardListError({ onRetry }: { onRetry: () => void }) {
  return (
    <View direction="row" gap={2}>
      <pre>list error</pre>
      <Button onClick={onRetry} size="small" type="button" variant="outline">
        Retry
      </Button>
    </View>
  );
}

function DashboardListBody() {
  const { status } = useDashboardContext();

  let body: ReactNode;
  switch (status) {
    case "empty":
      body = <DashboardListEmpty />;
      break;
    case "loading":
      body = <DashboardListLoading />;
      break;
    case "populated":
      body = <DashboardListPopulated />;
      break;
  }

  return body;
}

export function DashboardList() {
  return (
    <ErrorBoundary
      fallbackRender={({ resetErrorBoundary }) => (
        <DashboardListError onRetry={resetErrorBoundary} />
      )}
    >
      <DashboardListBody />
    </ErrorBoundary>
  );
}
