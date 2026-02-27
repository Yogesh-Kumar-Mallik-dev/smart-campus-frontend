import type { InputHTMLAttributes } from "react";
import clsx from "clsx";

const Input = ({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) => {
  return (
      <input
          className={clsx(
              "w-full px-3 py-2 rounded-lg border border-border bg-surface text-text",
              "focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary",
              "transition-all",
              className
          )}
          {...props}
      />
  );
};

export default Input;