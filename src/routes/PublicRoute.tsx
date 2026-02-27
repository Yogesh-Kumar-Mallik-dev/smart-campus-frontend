// routes/PublicRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "@/lib/auth";

const PublicRoute = () => {
  return isLoggedIn() ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default PublicRoute;