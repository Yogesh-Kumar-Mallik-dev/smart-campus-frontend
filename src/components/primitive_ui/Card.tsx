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

const Header = ({ children }: { children: ReactNode }) => {
  return <div className="mb-4 font-semibold">{children}</div>;
};

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Content = ({ children, className, ...props }: CardContentProps) => {
  return (
      <div className={clsx(className)} {...props}>
        {children}
      </div>
  );
};

const Footer = ({ children }: { children: ReactNode }) => {
  return <div className="mt-4 pt-4 border-t border-border">{children}</div>;
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