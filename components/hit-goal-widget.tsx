"use client";

import { View } from "reshaped";

import { useApplicationsContext } from "@/features/application";

import { CreateApplicationButton } from "./create-application-button";
import { GoalProgress } from "./goal-progress";

export function HitGoalWidget() {
  const applicationsContext = useApplicationsContext();

  const { current, total } = applicationsContext.goal;

  return (
    <View
      align="center"
      backgroundColor="positive-faded"
      borderRadius="large"
      gap={6}
      justify="center"
      paddingBlock={8}
      paddingInline={4}
    >
      <View align="center" gap={3} justify="center">
        <h2>Hit your goal</h2>

        <span>
          Generate and send out couple more job applications to get hired faster
        </span>

        <CreateApplicationButton fullWidth />
      </View>

      <View align="center" gap={2} justify="center">
        <View align="center" direction="row" gap={2}>
          <GoalProgress>
            {({ filled, index }) => (
              <GoalProgress.Bar filled={filled} key={index} />
            )}
          </GoalProgress>
        </View>

        <span>{`${current} out of ${total}`}</span>
      </View>
    </View>
  );
}
