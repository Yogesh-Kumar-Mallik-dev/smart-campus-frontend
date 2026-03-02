import Badge from "@components/primitive_ui/Badge";
import ThemeToggle from "@components/primitive_ui/ThemeToggle";

const Sidebar = () => {
  return (
      <aside className="w-64 border-r border-border bg-surface flex flex-col justify-between">
        <div className="p-6 space-y-6">
          <h1 className="text-xl font-bold text-text">Smart Campus</h1>

          <nav className="space-y-1">
            <a className="block px-3 py-2 rounded-lg text-text-muted hover:bg-surface-muted hover:text-text transition-colors">
              Dashboard
            </a>
            <a className="block px-3 py-2 rounded-lg text-text-muted hover:bg-surface-muted hover:text-text transition-colors">
              Users
            </a>
            <a className="block px-3 py-2 rounded-lg text-text-muted hover:bg-surface-muted hover:text-text transition-colors">
              Roles
            </a>
            <a className="block px-3 py-2 rounded-lg text-text-muted hover:bg-surface-muted hover:text-text transition-colors">
              Reports
            </a>
          </nav>
        </div>

        <div className="p-6 border-t border-border flex items-center justify-between">
          <Badge variant="info">ADMIN PANEL</Badge>
          <ThemeToggle />
        </div>
      </aside>
  );
};

export default Sidebar;