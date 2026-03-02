import { useNavigate } from "react-router-dom";
import Button from "@components/ui/Buttons";
import { logout } from "@/lib/auth";
import { toastSuccess } from "@/lib/toast";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();

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