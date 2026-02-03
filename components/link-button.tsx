"use client";

import Link from "next/link";
import { Button, type ButtonProps } from "reshaped";

type LinkButtonProps = ButtonProps & { href: string };

export function LinkButton({ href, ...props }: LinkButtonProps) {
  return (
    <Button
      {...props}
      render={({ children, className, onClick, ref }) => (
        <Link
          className={className}
          href={href}
          onClick={onClick}
          ref={ref as React.Ref<HTMLAnchorElement>}
        >
          {children}
        </Link>
      )}
    />
  );
}
