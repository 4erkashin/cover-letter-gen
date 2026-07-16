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
      href="/"
      className={[styles.root, className].filter(Boolean).join(" ")}
      tabIndex={isDashboard ? -1 : undefined}
      aria-label="Alt+Shift"
      aria-current={isDashboard ? "page" : undefined}
    >
      <AppLogo aria-hidden className={styles.logo} />
    </Link>
  );
}
