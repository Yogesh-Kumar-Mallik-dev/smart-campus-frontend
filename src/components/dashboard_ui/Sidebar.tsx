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

  // 🔥 Remove duplicates by path
  const allItems = [...permanentItems, ...dynamicItems].filter(
      (item, index, self) =>
          index === self.findIndex((i) => i.path === item.path)
  );

  return (
      <aside className="w-64 bg-surface border-r border-border flex flex-col">

        {/* TOP */}
        <div className="px-6 py-8 space-y-8 flex-1">

          {/* Brand */}
          <div>
            <h1 className="text-lg font-semibold tracking-tight">
              Smart Campus
            </h1>
            <div className="h-px bg-border mt-4" />
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {allItems.map((item) => (
                <NavLink key={item.path}
                    to={item.path}
                    end={item.path === "/dashboard"} // 👈 important fix
                    className={({ isActive }) =>
                        `block px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${ isActive ? "bg-primary/10 text-primary" : "text-text-muted hover:bg-surface-muted hover:text-text"}`} >
                  {item.label}
                </NavLink>
            ))}
          </nav>
        </div>

        {/* BOTTOM */}
        <div className="px-6 py-8 border-t border-border flex justify-center">
          <LogoutButton />
        </div>
      </aside>
  );
};

export default Sidebar;