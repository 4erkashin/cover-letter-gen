import { notFound } from "next/navigation";
import { Text, View } from "reshaped";

import { findCoverLetter } from "@/domain";

type EditCoverLetterPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditCoverLetterPage({
  params,
}: EditCoverLetterPageProps) {
  const { id } = await params;
  const coverLetter = findCoverLetter(id);

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
