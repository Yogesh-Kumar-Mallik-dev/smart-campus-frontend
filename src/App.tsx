import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import PublicRoute from "@routes/PublicRoute";
import PrivateRoute from "@routes/PrivateRoute";
import HomeRoute from "@routes/HomeRoute";

import LoginPage from "@pages/LoginPage";
import NotFoundPage from "@pages/NotFoundPage";

import DashboardPage from "@pages/DashboardPage";
import DashboardHome from "@pages/DashboardHome";
import UsersPage from "@pages/UsersPage";
import RolesPage from "@pages/RolesPage";

const App = () => {
  return (
      <BrowserRouter>
        <Toaster position="bottom-left" containerStyle={{ bottom: 24, left: 24 }}/>

        <Routes>
          {/* ROOT RESOLVER */}
          <Route path="/" element={<HomeRoute />} />

          {/* PUBLIC ROUTES */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>

          {/* PRIVATE ROUTES */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardPage />}>
              {/* /dashboard */}
              <Route index element={<DashboardHome />} />

              {/* /dashboard/users */}
              <Route path="users" element={<UsersPage />} />

              {/* /dashboard/roles */}
              <Route path="roles" element={<RolesPage />} />
            </Route>
          </Route>

          {/* 404 FALLBACK */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
  );
};

export default App;