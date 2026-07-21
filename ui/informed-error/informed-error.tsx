import { Button, Text, View } from "reshaped";

export type InformedErrorKind = "cover-letter-missing" | "unknown-route";

const COPY = {
  "cover-letter-missing": {
    headline: "This application isn't here",
    supporting: "It may have been removed, or the link may be out of date.",
  },
  "unknown-route": {
    headline: "This page isn't here",
    supporting: "The address may be mistyped, or the page may have moved.",
  },
} as const;

type InformedErrorProps = {
  kind: InformedErrorKind;
};

export function InformedError({ kind }: InformedErrorProps) {
  const { headline, supporting } = COPY[kind];

  return (
    <View gap={4} paddingBlock={8} align="start">
      <View gap={2}>
        <Text variant="title-3" as="h1">
          {headline}
        </Text>
        <Text variant="body-2" color="neutral-faded">
          {supporting}
        </Text>
      </View>
      <Button href="/" variant="solid" color="positive">
        Home
      </Button>
    </View>
  );
}
