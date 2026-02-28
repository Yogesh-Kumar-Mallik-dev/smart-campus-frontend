import clsx from "clsx";
import type { ReactNode } from "react";

type Variant =
    | "default"
    | "success"
    | "warning"
    | "error"
    | "info";

interface BadgeProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

const variantStyles: Record<Variant, string> = {
  default: "bg-surface-muted text-text border-border",
  success: "bg-success/10 text-success border-success/20",
  warning: "bg-warning/10 text-warning border-warning/20",
  error: "bg-error/10 text-error border-error/20",
  info: "bg-info/10 text-info border-info/20",
};

const Badge = ({
                 children,
                 variant = "default",
                 className,
               }: BadgeProps) => {
  return (
      <span
          className={clsx(
              "inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border",
              variantStyles[variant],
              className
          )}
      >
      {children}
    </span>
  );
};

export default Badge;