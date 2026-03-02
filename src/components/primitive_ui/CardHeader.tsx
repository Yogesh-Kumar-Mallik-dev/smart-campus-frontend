import type { ReactNode } from "react";

const CardHeader = ({ children }: { children: ReactNode }) => {
  return <div className="mb-4 font-semibold">{children}</div>;
};

export default CardHeader;