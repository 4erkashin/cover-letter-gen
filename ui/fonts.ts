import localFont from "next/font/local";

export const fixelText = localFont({
  src: [
    {
      path: "../public/fonts/fixel/FixelText-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/fixel/FixelText-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/fixel/FixelText-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/fixel/FixelText-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-fixel-text",
  display: "swap",
});

export const fixelDisplay = localFont({
  src: [
    {
      path: "../public/fonts/fixel/FixelDisplay-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/fixel/FixelDisplay-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/fixel/FixelDisplay-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/fixel/FixelDisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/fixel/FixelDisplay-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-fixel-display",
  display: "swap",
  preload: false,
});
