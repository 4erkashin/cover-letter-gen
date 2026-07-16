"use client";

import { Button, Grid, Text, View, useToast } from "reshaped";

import type { CoverLetter } from "@/domain";
import {
  removeCoverLetter,
  saveCoverLetter,
  useCoverLetters,
} from "@/features/persist-storage";
import { CreateNewButton } from "@/ui/create-new-button";
import { GoalBanner } from "@/ui/goal-banner";
import { LetterCard } from "@/ui/letter-card";

export function Dashboard() {
  const { coverLetters, isLoading } = useCoverLetters();
  const { show, hide } = useToast();
  const count = coverLetters.length;
  const isEmpty = !isLoading && count === 0;

  const handleDelete = (letter: CoverLetter) => {
    removeCoverLetter(letter.id);
    const toastId = show({
      title: "Cover letter deleted",
      text: "You can undo this action.",
      position: "bottom-end",
      timeout: "long",
      actionsSlot: (
        <Button
          type="button"
          variant="ghost"
          size="small"
          onClick={() => {
            saveCoverLetter(letter);
            hide(toastId);
          }}
        >
          Undo
        </Button>
      ),
    });
  };

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

      {count > 0 ? (
        <Grid columns={{ s: 1, m: 2 }} gap={4}>
          {coverLetters.map((letter) => (
            <Grid.Item key={letter.id}>
              <LetterCard
                id={letter.id}
                content={letter.content}
                onDelete={() => handleDelete(letter)}
              />
            </Grid.Item>
          ))}
        </Grid>
      ) : null}

      <GoalBanner count={count} />
    </View>
  );
}
