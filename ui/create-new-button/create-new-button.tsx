import { Button } from "reshaped";

import PlusIcon from "@/ui/assets/plus-icon.svg";

type CreateNewButtonProps = {
  className?: string;
  size?: "small" | "medium" | "large";
};

export function CreateNewButton({
  className,
  size = "medium",
}: CreateNewButtonProps) {
  return (
    <Button
      className={className}
      href="/new"
      variant="solid"
      color="primary"
      size={size}
      icon={PlusIcon}
    >
      Create New
    </Button>
  );
}
