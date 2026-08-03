"use client";

import type { ComponentProps } from "react";

import { Text } from "reshaped";

import { LinkButton } from "@/ui/link-button";

import PlusIcon from "@/ui/assets/plus-icon.svg";

type CreateNewButtonProps = Omit<
  ComponentProps<typeof LinkButton>,
  "children" | "color" | "icon" | "variant"
>;

export function CreateNewButton({
  attributes,
  ...props
}: CreateNewButtonProps) {
  return (
    <LinkButton
      {...props}
      attributes={{
        ...attributes,
        style: {
          border: "1px solid var(--rs-color-border-primary)",
          ...attributes?.style,
        },
      }}
      color="primary"
      icon={PlusIcon}
    >
      <Text as="span" variant="body-2" weight="semibold">
        Create New
      </Text>
    </LinkButton>
  );
}
