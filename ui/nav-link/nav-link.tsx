import type { ComponentProps } from "react";

import Link from "next/link";
import { classNames } from "reshaped";

import styles from "./nav-link.module.css";

type NavLinkProps = ComponentProps<typeof Link>;

export function NavLink({ className, ...props }: NavLinkProps) {
  return <Link {...props} className={classNames(styles.root, className)} />;
}
