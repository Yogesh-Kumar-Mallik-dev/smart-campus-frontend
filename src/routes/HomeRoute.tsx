// routes/HomeRoute.tsx

import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

const HomeRoute = () => {
  const user = useAuthStore((s) => s.user);
  const hydrated = useAuthStore((s) => s.hydrated);

  if (!hydrated) return null;

  return user
      ? <Navigate to="/dashboard" replace />
      : <Navigate to="/login" replace />;
};

export default HomeRoute;