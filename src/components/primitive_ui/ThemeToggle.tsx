import { FiSun, FiMoon } from "react-icons/fi";
import { useThemeStore } from "@store/themeStore";

const ThemeToggle = () => {
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);

  const isDark = theme === "dark";

  return (
      <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className={`relative inline-flex items-center w-14 h-8 rounded-full transition-colors duration-300 ease-out
        ${isDark ? "bg-primary" : "bg-surface-muted"}
      `}
      >
        {/* Moving thumb */}
        <span
            className={`absolute flex items-center justify-center w-6 h-6 rounded-full bg-surface shadow transition-transform duration-300 ease-out
          ${isDark ? "translate-x-6" : "translate-x-1"}
        `}
        >
        {/* Action hint icon */}
          {isDark ? (
              <FiSun className="w-4 h-4 text-text" />
          ) : (
              <FiMoon className="w-4 h-4 text-text" />
          )}
      </span>
      </button>
  );
};

export default ThemeToggle;