import localFont from "next/font/local";

import { FIXEL_DISPLAY_VAR, FIXEL_TEXT_VAR } from "@/ui/font-vars";

export const fixelText = localFont({
  display: "swap",
  src: [
    {
      path: "../public/fonts/fixel/FixelText-Regular.woff2",
      style: "normal",
      weight: "400",
    },
    {
      path: "../public/fonts/fixel/FixelText-Medium.woff2",
      style: "normal",
      weight: "500",
    },
    {
      path: "../public/fonts/fixel/FixelText-SemiBold.woff2",
      style: "normal",
      weight: "600",
    },
    {
      path: "../public/fonts/fixel/FixelText-Bold.woff2",
      style: "normal",
      weight: "700",
    },
  ],
  variable: FIXEL_TEXT_VAR,
});

export const fixelDisplay = localFont({
  display: "swap",
  preload: false,
  src: [
    {
      path: "../public/fonts/fixel/FixelDisplay-Regular.woff2",
      style: "normal",
      weight: "400",
    },
    {
      path: "../public/fonts/fixel/FixelDisplay-Medium.woff2",
      style: "normal",
      weight: "500",
    },
    {
      path: "../public/fonts/fixel/FixelDisplay-SemiBold.woff2",
      style: "normal",
      weight: "600",
    },
    {
      path: "../public/fonts/fixel/FixelDisplay-Bold.woff2",
      style: "normal",
      weight: "700",
    },
    {
      path: "../public/fonts/fixel/FixelDisplay-ExtraBold.woff2",
      style: "normal",
      weight: "800",
    },
  ],
  variable: FIXEL_DISPLAY_VAR,
});
