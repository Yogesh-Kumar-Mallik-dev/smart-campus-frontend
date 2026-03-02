import clsx from "clsx";
import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
}

const Section = ({ children, className }: SectionProps) => {
  return <section className={clsx("py-8", className)}>{children}</section>;
};

export default Section;