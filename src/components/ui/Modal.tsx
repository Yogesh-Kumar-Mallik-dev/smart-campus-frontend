import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import type { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

const focusableSelectors =
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/* ============================= */
/* ROOT MODAL */
/* ============================= */

const ModalRoot = ({ open, onClose, children, className }: ModalProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }

      if (e.key === "Tab") {
        const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
            focusableSelectors
        );

        if (!focusable || focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    // Focus first focusable element
    setTimeout(() => {
      const firstFocusable =
          panelRef.current?.querySelector<HTMLElement>(focusableSelectors);
      firstFocusable?.focus();
    }, 0);

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
      previouslyFocused.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
        />

        {/* Panel */}
        <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            className={clsx(
                "relative bg-surface border border-border rounded-2xl shadow-xl",
                "w-full max-w-lg",
                className
            )}
            onClick={(e) => e.stopPropagation()}
        >
          {/* Always Top-Right Close Button */}
          <button
              onClick={onClose}
              className="absolute top-4 right-4 text-text-muted hover:text-text transition-colors"
              aria-label="Close modal"
          >
            ✕
          </button>

          {children}
        </div>
      </div>,
      document.body
  );
};

/* ============================= */
/* SUB COMPONENTS */
/* ============================= */

const Header = ({ children }: { children: ReactNode }) => (
    <div className="px-6 pt-6 pb-4 border-b border-border text-lg font-semibold">
      {children}
    </div>
);

const Body = ({ children }: { children: ReactNode }) => (
    <div className="px-6 py-5">{children}</div>
);

const Footer = ({ children }: { children: ReactNode }) => (
    <div className="px-6 pb-6 pt-4 border-t border-border flex justify-end gap-3">
      {children}
    </div>
);

/* ============================= */
/* COMPOUND EXPORT */
/* ============================= */

export const Modal = Object.assign(ModalRoot, {
  Header,
  Body,
  Footer,
});