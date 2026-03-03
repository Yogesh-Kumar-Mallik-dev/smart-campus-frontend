// routes/PublicRoute.tsx

import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

const PublicRoute = () => {
  const user = useAuthStore((s) => s.user);
  const hydrated = useAuthStore((s) => s.hydrated);

  // Wait for persist hydration
  if (!hydrated) return null;

  // If logged in → block public pages
  return user ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default PublicRoute;