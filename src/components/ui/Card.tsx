import clsx from "clsx";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className }: CardProps) => {
  return (
      <div
          className={clsx(
              "bg-surface border border-border rounded-2xl shadow-sm p-6",
              className
          )}
      >
        {children}
      </div>
  );
};

export default Card;