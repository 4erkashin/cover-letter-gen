"use client";

import type { ComponentProps } from "react";
import type { ButtonProps } from "reshaped";

import Link from "next/link";

import { Button } from "@/ui/button";

type LinkButtonProps = Omit<ButtonProps, "href" | "render"> & {
  href: LinkProps["href"];
};

type LinkProps = ComponentProps<typeof Link>;

export function LinkButton({ href, ...props }: LinkButtonProps) {
  return (
    <Button
      {...props}
      render={(attributes) => (
        <Link {...(attributes as unknown as LinkProps)} href={href} />
      )}
    />
  );
}
