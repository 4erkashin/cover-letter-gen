"use client";

import { createContext, type ReactNode, use } from "react";

import { useLocalStorage } from "@/lib/useLocalStorage";

import { type Application } from "./application";
import { APPLICATIONS_AMOUNT_GOAL, APPLICATIONS_LS_KEY } from "./const";

interface ApplicationsState {
  addApplication: (application: Application) => void;
  applications: Application[];
  goal: {
    current: number;
    status: "completed" | "in-progress";
    total: number;
  };
}

const ApplicationsContext = createContext<ApplicationsState | null>(null);

export function useApplicationsContext() {
  const context = use(ApplicationsContext);

  if (!context) {
    throw new Error("Context must be used within ApplicationsProvider");
  }
  return context;
}

export function ApplicationsProvider({ children }: { children: ReactNode }) {
  const [applications, setApplications] = useLocalStorage<Application[]>(
    APPLICATIONS_LS_KEY,
    [],
  );

  const addApplication = (application: Application) => {
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
