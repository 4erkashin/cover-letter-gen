import localFont from "next/font/local";

/**
 * CSS custom property names for Fixel.
 * next/font requires `variable` to be an AST string literal — export the same
 * strings for the theme; keep them in sync via `ui/__tests__/fixel-font-vars.test.ts`.
 */
export const FIXEL_TEXT_VAR = "--font-fixel-text";
export const FIXEL_DISPLAY_VAR = "--font-fixel-display";

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
  variable: "--font-fixel-text",
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
  variable: "--font-fixel-display",
});
