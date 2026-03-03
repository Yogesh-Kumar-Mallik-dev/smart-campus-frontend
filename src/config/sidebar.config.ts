export interface SidebarItem {
  label: string;
  path: string;
  requiredRoles?: string[];
  mode?: "OR" | "AND";
}

export const sidebarItems: SidebarItem[] = [
  // Permanent
  { label: "Dashboard", path: "/dashboard" },
  { label: "Profile", path: "/dashboard/profile" },

  // Role-based modules
  {
    label: "User Management",
    path: "/dashboard/users",
    requiredRoles: ["REGISTRAR"],
    mode: "OR",
  },

  {
    label: "Reports",
    path: "/dashboard/reports",
    requiredRoles: ["ADMIN", "REGISTRAR"],
    mode: "OR",
  },
];