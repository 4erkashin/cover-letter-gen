import { View, type ViewProps } from "reshaped";

type IndicatorMarkProps = Omit<ViewProps, "children"> & {
  isFilled: boolean;
};

const NOT_FILLED_OPACITY = 0.24;

function IndicatorMark({ isFilled, ...props }: IndicatorMarkProps) {
  return (
    <View
      attributes={{
        "aria-hidden": true,
        style: {
          backgroundColor: "var(--rs-color-foreground-strong)",
          ...(!isFilled && { opacity: NOT_FILLED_OPACITY }),
        },
      }}
      borderRadius="circular"
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
