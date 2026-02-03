"use client";

import { LinkButton } from "../link-button";
import PlusIcon from "./plus.svg";

export function CreateApplicationButton() {
  return (
    <LinkButton color="positive" href="/application/new" icon={PlusIcon}>
      Create new
    </LinkButton>
  );
}
