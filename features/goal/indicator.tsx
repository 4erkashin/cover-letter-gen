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
        ...(!isFilled && {
          style: {
            opacity: NOT_FILLED_OPACITY,
          },
        }),
      }}
      backgroundColor="black"
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
