"use client";

import type { ComponentProps } from "react";

import Link from "next/link";
import { Button, type ButtonProps } from "reshaped";

type LinkButtonProps = Omit<ButtonProps, "href" | "render"> & {
  href: LinkProps["href"];
};

type LinkProps = ComponentProps<typeof Link>;

export function LinkButton({ href, ...props }: LinkButtonProps) {
  return (
    <Button
      {...props}
      /**
       * Spread the whole bag: picking keys off it drops `attributes`
       * (icon-only geometry vars) and `data-rs-aligner-target`.
       * Actionable types the bag against `HTMLButtonElement`, so an anchor
       * cast is the only way to hand it over whole.
       */
      render={(attributes) => (
        <Link {...(attributes as unknown as LinkProps)} href={href} />
      )}
    />
  );
}
