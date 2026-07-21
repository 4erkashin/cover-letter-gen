import { Text } from "reshaped";

type CharCounterProps = {
  length: number;
  max: number;
};

export function CharCounter({ length, max }: CharCounterProps) {
  const isOverLimit = length > max;

  return (
    <Text
      attributes={{ "data-over-limit": isOverLimit ? "true" : "false" }}
      color={isOverLimit ? "critical" : "neutral-faded"}
      variant="caption-1"
    >
      {length}/{max}
    </Text>
  );
}
