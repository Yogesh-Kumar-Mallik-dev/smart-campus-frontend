import type { ReactNode } from "react";

const CardFooter = ({ children }: { children: ReactNode }) => {
  return <div className="mt-4 pt-4 border-t border-border">{children}</div>;
};

export default CardFooter;