import { Navigate } from "react-router-dom";
import { isLoggedIn } from "@/lib/auth";

const HomeRoute = () => {
  return isLoggedIn()
      ? <Navigate to="/dashboard" replace />
      : <Navigate to="/login" replace />;
};

export default HomeRoute;