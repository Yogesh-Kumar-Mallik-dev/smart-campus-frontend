import { Outlet } from "react-router-dom";
import AppLayout from "@components/dashboard_ui/AppLayout";
import Sidebar from "@components/dashboard_ui/Sidebar";
import Main from "@components/dashboard_ui/Main";
import Topbar from "@components/dashboard_ui/Topbar";

const DashboardPage = () => {
  return (
      <AppLayout>
        <Sidebar />
        <Main>
          <Topbar />
          <div className="flex-1 overflow-y-auto overscroll-contain no-scrollbar">
            <Outlet />
          </div>
        </Main>
      </AppLayout>
  );
};

export default DashboardPage;