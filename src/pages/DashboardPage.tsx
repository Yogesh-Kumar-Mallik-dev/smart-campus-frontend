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
          <Topbar onCreate={() => {}} />
          <Outlet />
        </Main>
      </AppLayout>
  );
};

export default DashboardPage;