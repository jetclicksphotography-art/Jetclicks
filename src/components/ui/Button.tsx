import type { ButtonHTMLAttributes } from "react";
import { Link } from "react-router-dom";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { to?: string; variant?: "solid" | "outline" | "text" };

export function Button({ to, variant = "solid", className = "", children, ...props }: Props) {
  const classes = `button button-${variant} ${className}`;
  if (to) return <Link className={classes} to={to}>{children}</Link>;
  return <button className={classes} {...props}>{children}</button>;
}