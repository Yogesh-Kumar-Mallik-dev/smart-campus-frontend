import clsx from "clsx";
import type { ReactNode, HTMLAttributes } from "react";

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const CardContent = ({ children, className, ...props }: CardContentProps) => {
  return (
      <div className={clsx(className)} {...props}>
        {children}
      </div>
  );
};

export default CardContent;