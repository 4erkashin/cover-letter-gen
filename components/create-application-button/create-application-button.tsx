"use client";

import { type ComponentProps } from "react";

import { LinkButton } from "../link-button";
import PlusIcon from "./plus.svg";

export function CreateApplicationButton(
  props: Omit<ComponentProps<typeof LinkButton>, "color" | "href" | "icon">,
) {
  return (
    <LinkButton
      {...props}
      color="positive"
      href="/application/new"
      icon={PlusIcon}
    >
      Create new
    </LinkButton>
  );
}
