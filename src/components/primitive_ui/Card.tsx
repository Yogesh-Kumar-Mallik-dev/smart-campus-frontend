import clsx from "clsx";
import type { ReactNode, HTMLAttributes } from "react";

/* ============================= */
/* ROOT CARD */
/* ============================= */

interface CardProps {
  children: ReactNode;
  className?: string;
}

const CardRoot = ({ children, className }: CardProps) => {
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

/* ============================= */
/* SUB COMPONENTS */
/* ============================= */

interface CardSectionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Header = ({ children, className }: CardSectionProps) => {
  return (
      <div className={clsx("mb-4 font-semibold", className)}>
        {children}
      </div>
  );
};

const Content = ({ children, className, ...props }: CardSectionProps) => {
  return (
      <div className={clsx(className)} {...props}>
        {children}
      </div>
  );
};

const Footer = ({ children, className }: CardSectionProps) => {
  return (
      <div className={clsx("mt-4 pt-4 border-t border-border", className)}>
        {children}
      </div>
  );
};

/* ============================= */
/* COMPOUND EXPORT */
/* ============================= */

const Card = Object.assign(CardRoot, {
  Header,
  Content,
  Footer,
});

export default Card;