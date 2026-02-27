import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import PublicRoute from "@routes/PublicRoute";
import PrivateRoute from "@routes/PrivateRoute";
import HomeRoute from "@routes/HomeRoute";

import LoginPage from "@pages/LoginPage";

/* temp dashboard */
const Dashboard = () => <div className="p-6">Dashboard</div>;

const App = () => {
  return (
      <BrowserRouter>
        <Toaster position="bottom-left" containerStyle={{ bottom: 24, left: 24 }} />

        <Routes>
          {/*  ROOT RESOLVER */}
          <Route path="/" element={<HomeRoute />} />

          {/* ---------- PUBLIC ---------- */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>

          {/* ---------- PRIVATE ---------- */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
};

export default App;