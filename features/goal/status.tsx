"use client";

import { Icon, Text, View } from "reshaped";

import { Skeleton } from "@/ui/skeleton";

import CheckIcon from "@/ui/assets/check-icon.svg";

import { GoalProgress } from "./progress";
import { useGoalContext } from "./root";

export function GoalStatus() {
  const { count, /* isLoading, */ isReached, target } = useGoalContext();

  const isLoading = true;

  if (isLoading) {
    return (
      <View
        attributes={{
          "aria-busy": true,
          "aria-label": "Goal progress loading",
        }}
      >
        <Text variant="body-1">
          <Skeleton width="11rem" />
        </Text>
      </View>
    );
  }

  return (
    <View align="center" direction="row" gap={3}>
      <Text color="neutral" variant="body-1">
        {count}/{target} applications generated
      </Text>

      {isReached ? (
        <Icon
          attributes={{ "aria-label": "Goal reached", role: "img" }}
          size={7}
          svg={CheckIcon}
        />
      ) : (
        <GoalProgress variant="dots" />
      )}
    </View>
  );
}
