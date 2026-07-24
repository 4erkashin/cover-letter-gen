import { View, type ViewProps } from "reshaped";

type IndicatorMarkProps = Omit<ViewProps, "children"> & {
  isFilled: boolean;
};

function IndicatorMark({ isFilled, ...props }: IndicatorMarkProps) {
  return (
    <View
      attributes={{
        "aria-hidden": true,
        ...(isFilled && {
          style: {
            backgroundColor: "var(--rs-color-foreground-neutral)",
          },
        }),
      }}
      backgroundColor={isFilled ? undefined : "neutral-faded"}
      borderRadius="small"
      height={2}
      {...props}
    />
  );
}

function IndicatorDot({ isFilled, ...props }: IndicatorMarkProps) {
  return <IndicatorMark isFilled={isFilled} width={2} {...props} />;
}

function IndicatorDash({ isFilled, ...props }: IndicatorMarkProps) {
  return <IndicatorMark isFilled={isFilled} width={8} {...props} />;
}

export const Indicator = {
  Dash: IndicatorDash,
  Dot: IndicatorDot,
};
