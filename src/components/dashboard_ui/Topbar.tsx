import { useLocation } from "react-router-dom";
import Container from "@components/primitive_ui/Container";
import ThemeToggle from "@components/primitive_ui/ThemeToggle";
import { sidebarItems } from "@/config/sidebar.config";

const Topbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Sort by longest path first
  const sortedItems = [...sidebarItems].sort(
      (a, b) => b.path.length - a.path.length
  );

  const matchedItem = sortedItems.find((item) =>
      currentPath.startsWith(item.path)
  );

  const title = matchedItem?.label || "Dashboard";

  return (
      <div className="border-b border-border bg-surface">
        <Container>
          <div className="flex items-center justify-between py-4">
            <h2 className="text-lg font-semibold text-text">
              {title}
            </h2>

            <ThemeToggle />
          </div>
        </Container>
      </div>
  );
};

export default Topbar;