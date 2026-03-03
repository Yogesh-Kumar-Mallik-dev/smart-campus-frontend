import { useNavigate } from "react-router-dom";
import Button from "@components/primitive_ui/Buttons";
import { toastSuccess } from "@lib/toast";
import { useAuthStore } from "@store/authStore";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = useAuthStore.getState().token;

      if (token) {
        await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch {
      // even if backend fails, clear frontend state
    }

    // 🔥 Clear Zustand
    useAuthStore.getState().logout();

    toastSuccess("Logged out successfully");

    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 800);
  };

  return (
      <Button
          variant="secondary"
          intent="stroke"
          size="md"
          onClick={handleLogout}
      >
        Logout
      </Button>
  );
};

export default LogoutButton;