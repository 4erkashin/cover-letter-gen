import { Text, View } from "reshaped";

export default function NewCoverLetterPage() {
  return (
    <View gap={2}>
      <Text variant="title-3" as="h1">
        New application
      </Text>
      <Text variant="body-2" color="neutral-faded">
        Create form stub — fields and generation arrive in later tickets.
      </Text>
    </View>
  );
}
