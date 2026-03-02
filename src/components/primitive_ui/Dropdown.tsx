import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import type { KeyboardEvent } from "react";

/* ---------- TYPES ---------- */
export type Option = {
  label: string;
  value: string;
};

interface DropdownProps {
  options: Option[];
  value?: Option | null;
  onChange: (option: Option) => void;
  placeholder?: string;
}

const Dropdown = ({ options, value, onChange, placeholder }: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const ref = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  /* ---------- outside click ---------- */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    };
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, []);

  /* ---------- focus active option ---------- */
  useEffect(() => {
    if (open && activeIndex >= 0) {
      optionRefs.current[activeIndex]?.focus();
    }
  }, [open, activeIndex]);

  /* ---------- keyboard ---------- */
  const handleKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (["ArrowDown", "ArrowUp", "Enter", "Escape"].includes(e.key)) {
      e.stopPropagation(); // ⭐ isolate dropdown keyboard
    }

    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      e.preventDefault();
      setOpen(true);
      setActiveIndex(0);
      return;
    }

    if (!open) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % options.length);
        break;

      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => (i - 1 + options.length) % options.length);
        break;

      case "Enter":
        e.preventDefault();
        if (activeIndex >= 0) {
          onChange(options[activeIndex]);
          setOpen(false);
          setActiveIndex(-1);
        }
        break;

      case "Escape":
        setOpen(false);
        setActiveIndex(-1);
        break;

      case "Tab":
        setOpen(false);
        setActiveIndex(-1);
        break;
    }
  };

  return (
      <div ref={ref} className="relative">
        {/* ---------- TRIGGER ---------- */}
        <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            onKeyDown={handleKey}
            className="w-full px-3 py-2 rounded-lg border border-border bg-surface text-text text-left focus:outline-none focus:ring-2 focus:ring-primary/40"
        >
          {value?.label ?? placeholder ?? "Select"}
        </button>

        {/* ---------- MENU ---------- */}
        {open && (
            <div className="absolute z-20 mt-1 w-full rounded-lg border border-border bg-surface shadow-lg overflow-hidden">
              {options.map((opt, i) => (
                  <button
                      key={opt.value}
                      ref={(el) => {
                        optionRefs.current[i] = el;
                      }}
                      onKeyDown={handleKey}   // ⭐ ADD THIS
                      type="button"
                      onClick={() => {
                        onChange(opt);
                        setOpen(false);
                        setActiveIndex(-1);
                      }}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={clsx(
                          "block w-full px-3 py-2 text-left transition-colors focus:outline-none",
                          i === activeIndex && "bg-primary/10",
                          value?.value === opt.value && "font-medium"
                      )}
                  >
                    {opt.label}
                  </button>
              ))}
            </div>
        )}
      </div>
  );
};

export default Dropdown;