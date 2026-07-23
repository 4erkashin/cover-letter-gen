import { View } from "reshaped";

type IndicatorMarkProps = {
  active: boolean;
};

type IndicatorMarkSizeProps = IndicatorMarkProps & {
  width: number;
};

function IndicatorMark({ active, width }: IndicatorMarkSizeProps) {
  return (
    <View
      attributes={{
        "aria-hidden": true,
        ...(active && {
          style: {
            backgroundColor: "var(--rs-color-foreground-neutral)",
          },
        }),
      }}
      backgroundColor={active ? undefined : "neutral-faded"}
      borderRadius="small"
      height={2}
      width={width}
    />
  );
}

function IndicatorDot({ active }: IndicatorMarkProps) {
  return <IndicatorMark active={active} width={2} />;
}

function IndicatorDash({ active }: IndicatorMarkProps) {
  return <IndicatorMark active={active} width={8} />;
}

export const Indicator = {
  Dash: IndicatorDash,
  Dot: IndicatorDot,
};
