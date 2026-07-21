"use client";

import { Button, Grid, Text, useToast, View } from "reshaped";

import type { CoverLetter } from "@/domain";

import {
  removeCoverLetter,
  saveCoverLetter,
  useCoverLetters,
} from "@/features/persist-storage";

import { CreateNewButton } from "./create-new-button";
import { GoalBanner } from "./goal-banner";
import { LetterCard } from "./letter-card";

export function Dashboard() {
  const { coverLetters, isLoading } = useCoverLetters();
  const { hide, show } = useToast();
  const count = coverLetters.length;
  const isEmpty = !isLoading && count === 0;

  const handleDelete = (letter: CoverLetter) => {
    removeCoverLetter(letter.id);
    const toastId = show({
      actionsSlot: (
        <Button
          onClick={() => {
            saveCoverLetter(letter);
            // Toast undo closes over the id `show` returns — circular by API design.
            // eslint-disable-next-line react-hooks/immutability -- toast id from show()
            hide(toastId);
          }}
          size="small"
          type="button"
          variant="ghost"
        >
          Undo
        </Button>
      ),
      position: "bottom-end",
      text: "You can undo this action.",
      timeout: "long",
      title: "Cover letter deleted",
    });
  };

  return (
    <View gap={8}>
      <View align="center" direction="row" gap={4} justify="space-between">
        <Text as="h1" variant="title-2">
          Applications
        </Text>
        <CreateNewButton />
      </View>

      {isEmpty ? (
        <View align="center" gap={4} paddingBlock={10}>
          <Text align="center" as="h2" variant="featured-3">
            No applications yet
          </Text>
          <Text align="center" color="neutral-faded" variant="body-2">
            Create your first one and it will show up here.
          </Text>
          <CreateNewButton />
        </View>
      ) : null}

      {count > 0 ? (
        <Grid columns={{ m: 2, s: 1 }} gap={4}>
          {coverLetters.map((letter) => (
            <Grid.Item key={letter.id}>
              <LetterCard
                content={letter.content}
                id={letter.id}
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
