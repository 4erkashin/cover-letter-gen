"use client";

import type { ReactNode } from "react";

import { Grid, Text, useToast, View } from "reshaped";

import type { CoverLetter } from "@/domain";

import { Goal } from "@/features/goal";
import {
  removeCoverLetter,
  saveCoverLetter,
  useCoverLetters,
} from "@/features/persist-storage";
import { Button } from "@/ui/button";
import { CreateNewButton } from "@/ui/create-new-button";

import { LetterCard, LetterCardSkeleton } from "./letter-card";
import { listStatus } from "./list-status";

const LIST_GRID_COLUMNS = { m: 2, s: 1 } as const;

/** Parked dashboard body (list + goal + delete). Not wired from Dashboard yet. */
export function Body() {
  const { coverLetters, isLoading } = useCoverLetters();
  const { hide, show } = useToast();
  const status = listStatus(isLoading, coverLetters.length);

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

  let listBody: ReactNode;
  switch (status) {
    case "empty":
      listBody = (
        <View align="center" gap={4} paddingBlock={10}>
          <Text align="center" as="h2" variant="featured-3">
            No applications yet
          </Text>
          <Text align="center" color="neutral-faded" variant="body-2">
            Create your first one and it will show up here.
          </Text>
          <CreateNewButton href="/new" />
        </View>
      );
      break;
    case "loading":
      listBody = (
        <View
          attributes={{
            "aria-busy": true,
            "aria-label": "Applications loading",
          }}
        >
          <Grid columns={LIST_GRID_COLUMNS} gap={4}>
            <Grid.Item>
              <LetterCardSkeleton />
            </Grid.Item>
            <Grid.Item>
              <LetterCardSkeleton />
            </Grid.Item>
          </Grid>
        </View>
      );
      break;
    case "populated":
      listBody = (
        <Grid columns={LIST_GRID_COLUMNS} gap={4}>
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
      );
      break;
  }

  return (
    <>
      {listBody}

      <Goal.Root>
        <Goal.Banner action={<CreateNewButton href="/new" size="large" />} />
      </Goal.Root>
    </>
  );
}
