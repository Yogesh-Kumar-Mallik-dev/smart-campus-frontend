import type { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
      <div className="min-h-screen bg-bg text-text flex">
        {children}
      </div>
  );
};

export default AppLayout;