import type { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
      <div className="h-screen flex bg-bg text-text overflow-hidden">
        {children}
      </div>
  );
};

export default AppLayout;