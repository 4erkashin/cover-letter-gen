import { Button } from "reshaped";

import PlusIcon from "@/ui/assets/plus-icon.svg";

type CreateNewButtonProps = {
  className?: string;
  size?: "large" | "medium" | "small";
};

export function CreateNewButton({
  className,
  size = "medium",
}: CreateNewButtonProps) {
  return (
    <Button
      className={className}
      color="positive"
      href="/new"
      icon={PlusIcon}
      size={size}
      variant="solid"
    >
      Create New
    </Button>
  );
}
