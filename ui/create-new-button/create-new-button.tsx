"use client";

import type { ComponentProps } from "react";

import { LinkButton } from "@/ui/link-button";

import PlusIcon from "@/ui/assets/plus-icon.svg";

type CreateNewButtonProps = Omit<
  ComponentProps<typeof LinkButton>,
  "children" | "color" | "href" | "icon" | "variant"
>;

export function CreateNewButton(props: CreateNewButtonProps) {
  return (
    <LinkButton
      {...props}
      color="positive"
      href="/new"
      icon={PlusIcon}
      variant="solid"
    >
      Create New
    </LinkButton>
  );
}
