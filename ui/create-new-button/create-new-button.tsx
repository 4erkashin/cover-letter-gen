"use client";

import type { ComponentProps } from "react";

import { LinkButton } from "@/ui/link-button";

import PlusIcon from "@/ui/assets/plus-icon.svg";

type CreateNewButtonProps = Omit<
  ComponentProps<typeof LinkButton>,
  "children" | "color" | "icon" | "variant"
>;

export function CreateNewButton(props: CreateNewButtonProps) {
  return (
    <LinkButton {...props} color="positive" icon={PlusIcon} variant="solid">
      Create New
    </LinkButton>
  );
}
