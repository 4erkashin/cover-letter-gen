"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { Text, View } from "reshaped";

import { findCoverLetter } from "@/domain";
import { useCoverLetters } from "@/features/persist-storage";

type EditCoverLetterPageProps = {
  params: Promise<{ id: string }>;
};

export default function EditCoverLetterPage({
  params,
}: EditCoverLetterPageProps) {
  const { id } = use(params);
  const { coverLetters, isLoading } = useCoverLetters();

  if (isLoading) {
    return (
      <View gap={2}>
        <Text variant="body-2" color="neutral-faded">
          Loading…
        </Text>
      </View>
    );
  }

  const coverLetter = findCoverLetter(coverLetters, id);

  if (!coverLetter) {
    notFound();
  }

  return (
    <View gap={2}>
      <Text variant="title-3" as="h1">
        Edit application
      </Text>
      <Text variant="body-2" color="neutral-faded">
        Edit stub for Cover Letter {coverLetter.id} — Try Again arrives later.
      </Text>
    </View>
  );
}
