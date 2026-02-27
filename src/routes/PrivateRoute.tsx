// routes/PrivateRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "@/lib/auth";

const PrivateRoute = () => {
  return isLoggedIn() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;