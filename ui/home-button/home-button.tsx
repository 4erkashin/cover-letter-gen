"use client";

import type { ComponentProps } from "react";

import { LinkButton } from "@/ui/link-button";

import HomeIcon from "@/ui/assets/home-icon.svg";

type HomeButtonProps = Omit<
  ComponentProps<typeof LinkButton>,
  "children" | "href" | "icon" | "size" | "variant"
>;

export function HomeButton(props: HomeButtonProps) {
  return (
    <LinkButton
      /**
       * Figma wants 40×40 with a 20px glyph;
       * Reshaped derives both from `size` and offers 36 (medium) or 52 (large).
       * `large` buys the 20px icon,
       * the vars reset the box: 24 + 2×8 tall, 24 − 8 + 2×12 wide,
       * icon-only trimming padding to 10px.
       */
      attributes={{
        "aria-label": "Home",
        style: {
          "--rs-button-line-height": "var(--rs-unit-x6)",
          "--rs-button-p-h": "var(--rs-unit-x3)",
          "--rs-button-p-v": "var(--rs-unit-x2)",
        },
      }}
      {...props}
      href="/"
      icon={HomeIcon}
      size="large"
      variant="outline"
    />
  );
}
