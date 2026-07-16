"use client";

import { Text, View } from "reshaped";

import { useCoverLetters } from "@/features/persist-storage";
import { CreateNewButton } from "@/ui/create-new-button";
import { GoalBanner } from "@/ui/goal-banner";

export function Dashboard() {
  const { coverLetters, isLoading } = useCoverLetters();
  const count = coverLetters.length;
  const isEmpty = !isLoading && count === 0;

  return (
    <View gap={8}>
      <View direction="row" align="center" justify="space-between" gap={4}>
        <Text variant="title-2" as="h1">
          Applications
        </Text>
        <CreateNewButton />
      </View>

      {isEmpty ? (
        <View gap={4} align="center" paddingBlock={10}>
          <Text variant="featured-3" as="h2" align="center">
            No applications yet
          </Text>
          <Text variant="body-2" color="neutral-faded" align="center">
            Create your first one and it will show up here.
          </Text>
          <CreateNewButton />
        </View>
      ) : null}

      <GoalBanner count={count} />
    </View>
  );
}
