// routes/PrivateRoute.tsx

import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

const PrivateRoute = () => {
  const { token, user } = useAuthStore();

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;