import clsx from "clsx";

/**
 * Button Component
 * API:
 *  variant: primary | secondary | mute-primary | mute-secondary
 *  type: fill | stroke
 *  size: sm | md | lg
 */

const base =
    "relative overflow-hidden inline-flex items-center justify-center font-medium rounded-lg border transition-all duration-200 ease-out active:scale-95";

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

const styles = {
  primary: {
    stroke:
        "text-primary border-primary bg-transparent hover:bg-primary hover:text-primary-foreground",
    fill:
        "text-primary-foreground border-primary bg-primary hover:bg-transparent hover:text-primary",
  },

  secondary: {
    stroke:
        "text-secondary border-secondary bg-transparent hover:bg-secondary hover:text-secondary-foreground",
    fill:
        "text-secondary-foreground border-secondary bg-secondary hover:bg-transparent hover:text-secondary",
  },

  "mute-primary": {
    stroke:
        "text-primary border-primary bg-primary/10 hover:bg-primary hover:text-primary-foreground",
    fill:
        "text-primary-foreground border-primary bg-primary/70 hover:bg-primary/10 hover:text-primary",
  },

  "mute-secondary": {
    stroke:
        "text-secondary border-secondary bg-secondary/10 hover:bg-secondary hover:text-secondary-foreground",
    fill:
        "text-secondary-foreground border-secondary bg-secondary/70 hover:bg-secondary/10 hover:text-secondary",
  },
};

import type { ReactNode, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "mute-primary" | "mute-secondary";
type Type = "fill" | "stroke";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  intent?: Type;
  size?: Size;
  children: ReactNode;
}

const Button = ({
                  children,
                  variant = "primary",
                  intent = "fill",
                  size = "md",
                  className,
                  ...props
                }: ButtonProps) => {
  return (
      <button
          className={clsx(base, sizes[size], styles[variant][intent], className)}
          {...props}
      >
        <span className="pointer-events-none absolute inset-0 opacity-0 active:opacity-15 bg-current transition-opacity duration-150" />
        <span className="relative z-10">{children}</span>
      </button>
  );
};

export default Button;
