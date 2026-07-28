import type { ComponentProps } from "react";

import { Icon, View } from "reshaped";

import AppLogoCircle from "@/ui/assets/app-logo-circle.svg";
import AppLogoText from "@/ui/assets/app-logo-text.svg";

type AppLogoProps = Omit<ComponentProps<typeof View>, "children">;

export function AppLogo(props: AppLogoProps) {
  return (
    <View
      align="center"
      attributes={{ "aria-label": "Alt+Shift", role: "img" }}
      direction="row"
      gap={3}
      {...props}
    >
      <Icon
        attributes={{ style: { color: "var(--rs-color-brand)" } }}
        size={11}
        svg={AppLogoCircle}
      />
      <Icon
        attributes={{ style: { color: "var(--rs-color-black)" } }}
        autoWidth
        size={5.5}
        svg={AppLogoText}
      />
    </View>
  );
}
