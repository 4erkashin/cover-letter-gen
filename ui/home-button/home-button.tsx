import { Button } from "reshaped";

import HomeIcon from "@/ui/assets/home-icon.svg";

type HomeButtonProps = {
  className?: string;
};

export function HomeButton({ className }: HomeButtonProps) {
  return (
    <Button
      attributes={{ "aria-label": "Home" }}
      className={className}
      href="/"
      icon={HomeIcon}
      size="small"
      variant="outline"
    />
  );
}
