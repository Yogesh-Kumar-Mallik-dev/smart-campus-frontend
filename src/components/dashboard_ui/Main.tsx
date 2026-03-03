import type { ReactNode } from "react";

const Main = ({ children }: { children: ReactNode }) => {
  return (
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {children}
      </div>
  );
};

export default Main;