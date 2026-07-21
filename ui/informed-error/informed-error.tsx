import { Button, Text, View } from "reshaped";

export type InformedErrorKind = "missing-application" | "unknown-route";

const COPY = {
  "missing-application": {
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
    <View align="start" gap={4} paddingBlock={8}>
      <View gap={2}>
        <Text as="h1" variant="title-3">
          {headline}
        </Text>
        <Text color="neutral-faded" variant="body-2">
          {supporting}
        </Text>
      </View>
      <Button color="positive" href="/" variant="solid">
        Home
      </Button>
    </View>
  );
}
