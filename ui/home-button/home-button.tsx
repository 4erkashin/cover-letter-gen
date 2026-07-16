import { Button } from "reshaped";

import HomeIcon from "@/ui/assets/home-icon.svg";

type HomeButtonProps = {
  className?: string;
};

export function HomeButton({ className }: HomeButtonProps) {
  return (
    <Button
      className={className}
      href="/"
      variant="outline"
      size="small"
      icon={HomeIcon}
      attributes={{ "aria-label": "Home" }}
    />
  );
}
