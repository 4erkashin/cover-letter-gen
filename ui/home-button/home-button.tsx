"use client";

import type { ComponentProps } from "react";

import { LinkButton } from "@/ui/link-button";

import HomeIcon from "@/ui/assets/home-icon.svg";

type HomeButtonProps = Omit<
  ComponentProps<typeof LinkButton>,
  "children" | "icon" | "size" | "variant"
>;

export function HomeButton(props: HomeButtonProps) {
  return (
    <LinkButton
      /**
       * Figma wants 40×40 with a 20px glyph.
       * Default medium already remaps the icon to 20 (ADR-0015);
       * these vars beat medium CTA pads so icon-only lands on 40×40:
       * 24 + 2×8 tall, 20 + 2×10 wide (icon-only trims p-h by 2).
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
      icon={HomeIcon}
      variant="outline"
    />
  );
}
