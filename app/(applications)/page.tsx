"use client";

import { use } from "react";

import { CreateApplicationButton } from "@/components/create-application-button";
import { HitGoalWidget } from "@/components/hit-goal-widget";
import { PageHeader } from "@/components/page-header";
import { ApplicationsContext } from "@/features/application";

export default function Home() {
  const applicationsContext = use(ApplicationsContext);

  if (!applicationsContext) {
    throw new Error("Home page must be used within ApplicationsProvider");
  }

  return (
    <>
      <PageHeader>
        <h1>Applications</h1>

        <CreateApplicationButton />
      </PageHeader>

      {applicationsContext.goal.status === "in-progress" && <HitGoalWidget />}
    </>
  );
}
