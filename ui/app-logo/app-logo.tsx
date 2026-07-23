import { Icon, View } from "reshaped";

import AppLogoCircle from "@/ui/assets/app-logo-circle.svg";
import AppLogoText from "@/ui/assets/app-logo-text.svg";

export function AppLogo() {
  return (
    <View
      align="center"
      attributes={{ "aria-label": "Alt+Shift", role: "img" }}
      direction="row"
      gap={3}
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
