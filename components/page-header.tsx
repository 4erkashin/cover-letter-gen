import { type ComponentProps } from "react";
import { View } from "reshaped";

export function PageHeader(props: ComponentProps<typeof View>) {
  return (
    <View
      align="center"
      as="header"
      borderBottom
      borderColor="neutral"
      direction="row"
      justify="space-between"
      paddingBottom={5}
      {...props}
    />
  );
}
