"use client";

import { use } from "react";
import { View } from "reshaped";

import { CreateApplicationButton } from "@/components/create-application-button";
import { HitGoalWidget } from "@/components/hit-goal-widget";
import { ApplicationsContext } from "@/features/application";

export default function Home() {
  const applicationsContext = use(ApplicationsContext);

  if (!applicationsContext) {
    throw new Error("Home page must be used within ApplicationsProvider");
  }

  return (
    <>
      <View
        align="center"
        as="header"
        borderBottom
        borderColor="neutral"
        direction="row"
        justify="space-between"
        paddingBottom={5}
      >
        <h1>Applications</h1>

        <CreateApplicationButton />
      </View>

      {applicationsContext.goal.status === "in-progress" && <HitGoalWidget />}
    </>
  );
}
