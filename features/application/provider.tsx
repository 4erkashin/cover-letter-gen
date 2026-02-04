"use client";

import { createContext, type ReactNode } from "react";

import { useLocalStorage } from "@/lib/useLocalStorage";

import { APPLICATIONS_AMOUNT_GOAL, APPLICATIONS_LS_KEY } from "./const";

interface ApplicationsState {
  addApplication: (application: unknown) => void;
  applications: unknown[];
  goal: {
    current: number;
    status: "completed" | "in-progress";
    total: number;
  };
}

export const ApplicationsContext = createContext<ApplicationsState | null>(
  null,
);

export function ApplicationsProvider({ children }: { children: ReactNode }) {
  const [applications, setApplications] = useLocalStorage<unknown[]>(
    APPLICATIONS_LS_KEY,
    [],
  );

  const addApplication = (application: unknown) => {
    setApplications((prev) => [...prev, application]);
  };

  return (
    <ApplicationsContext.Provider
      value={{
        addApplication,
        applications,
        goal: {
          current: Math.min(applications.length, APPLICATIONS_AMOUNT_GOAL),
          status:
            applications.length <= APPLICATIONS_AMOUNT_GOAL
              ? "in-progress"
              : "completed",
          total: APPLICATIONS_AMOUNT_GOAL,
        },
      }}
    >
      {children}
    </ApplicationsContext.Provider>
  );
}
