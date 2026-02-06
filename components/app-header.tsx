"use client";

import { View } from "reshaped";

import { useApplicationsContext } from "@/features/application";

import { AppLogo } from "./app-logo";
import { GoalProgress } from "./goal-progress";
import { HomeButton } from "./home-button";

export function AppHeader() {
  const applicationsContext = useApplicationsContext();

  const { current, total } = applicationsContext.goal;

  return (
    <View align="center" as="header" direction="row" justify="space-between">
      <AppLogo />

      <View align="center" direction="row" gap={4}>
        <View align="center" direction="row" gap={3}>
          <span>{`${current}/${total} generated`}</span>

          <View align="center" direction="row" gap={1}>
            <GoalProgress>
              {({ filled, index }) => (
                <GoalProgress.Dot filled={filled} key={index} />
              )}
            </GoalProgress>
          </View>
        </View>

        <HomeButton />
      </View>
    </View>
  );
}
