"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import { Text, View } from "reshaped";

import { findCoverLetter } from "@/domain";
import { EditCoverLetter } from "@/features/letter-form";
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
        <Text color="neutral-faded" variant="body-2">
          Loading…
        </Text>
      </View>
    );
  }

  const coverLetter = findCoverLetter(coverLetters, id);

  if (!coverLetter) {
    notFound();
  }

  return <EditCoverLetter coverLetter={coverLetter} />;
}
