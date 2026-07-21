"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import AppLogo from "@/ui/assets/app-logo.svg";

import styles from "./brand-link.module.css";

type BrandLinkProps = {
  className?: string;
};

export function BrandLink({ className }: BrandLinkProps) {
  const pathname = usePathname();
  const isDashboard = pathname === "/";

  return (
    <Link
      aria-current={isDashboard ? "page" : undefined}
      aria-label="Alt+Shift"
      className={[styles.root, className].filter(Boolean).join(" ")}
      href="/"
      tabIndex={isDashboard ? -1 : undefined}
    >
      <AppLogo aria-hidden className={styles.logo} />
    </Link>
  );
}
