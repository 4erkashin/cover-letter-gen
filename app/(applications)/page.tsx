"use client";

import { CreateApplicationButton } from "@/components/create-application-button";
import { HitGoalWidget } from "@/components/hit-goal-widget";
import { PageHeader } from "@/components/page-header";
import { useApplicationsContext } from "@/features/application";

export default function Home() {
  const applicationsContext = useApplicationsContext();

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
