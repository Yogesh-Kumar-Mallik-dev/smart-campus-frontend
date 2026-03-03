import { NavLink } from "react-router-dom";
import LogoutButton from "@components/auth/LogoutButton";

import { sidebarItems } from "@/config/sidebar.config";
import { hasPermission } from "@/utils/permission";
import { useAuthStore } from "@/store/authStore";

const Sidebar = () => {
  const user = useAuthStore((s) => s.user);

  const permanentItems = [
    { label: "Dashboard", path: "/dashboard" },
  ];

  const dynamicItems = user
      ? sidebarItems.filter((item) =>
          hasPermission(user.roles, item.requiredRoles, item.mode)
      )
      : [];

  const allItems = [...permanentItems, ...dynamicItems].filter(
      (item, index, self) =>
          index === self.findIndex((i) => i.path === item.path)
  );

  return (
      <aside className="w-64 h-full flex-shrink-0 bg-surface border-r border-border flex flex-col overflow-hidden">

        {/* Header */}
        <div className="px-6 py-8">
          <h1 className="text-lg font-semibold tracking-tight">
            Smart Campus
          </h1>
          <div className="h-px bg-border mt-4" />
        </div>

        {/* Scrollable Links Only */}
        <div className="flex-1 overflow-y-auto overscroll-contain no-scrollbar px-6">
          <nav className="space-y-2 py-4">
            {allItems.map((item) => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === "/dashboard"}
                    className={({ isActive }) =>
                        `block px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                            isActive
                                ? "bg-primary/10 text-primary"
                                : "text-text-muted hover:bg-surface-muted hover:text-text"
                        }`
                    }
                >
                  {item.label}
                </NavLink>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="px-6 py-6 border-t border-border flex justify-center items-center">
          <LogoutButton />
        </div>

      </aside>
  );
};

export default Sidebar;