"use client";

import { createContext, type ReactNode, useContext } from "react";

import { useCoverLetters } from "@/features/persist-storage";

import { listStatus, type ListStatus } from "./list-status";

type DashboardContextValue = {
  status: ListStatus;
};

const DashboardContext = createContext<DashboardContextValue | null>(null);

type DashboardRootProps = {
  children: ReactNode;
};

export function useDashboardContext(): DashboardContextValue {
  const value = useContext(DashboardContext);
  if (!value) {
    throw new Error("Dashboard parts must be used within Dashboard.Root");
  }
  return value;
}

export function DashboardRoot({ children }: DashboardRootProps) {
  const { coverLetters, isLoading } = useCoverLetters();
  const status = listStatus(isLoading, coverLetters.length);

  return (
    <DashboardContext.Provider value={{ status }}>
      {children}
    </DashboardContext.Provider>
  );
}
