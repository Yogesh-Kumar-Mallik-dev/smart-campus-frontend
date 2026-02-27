import { toast } from "react-hot-toast";
import type { ToastOptions } from "react-hot-toast";

/**
 * Base themed toast
 */
const base: ToastOptions = {
  duration: 3000,
  className:
      "bg-surface text-text border border-border shadow-lg rounded-lg px-4 py-3",
};

/**
 * SUCCESS
 */
export const toastSuccess = (message: string) =>
    toast.success(message, {
      ...base,
      iconTheme: {
        primary: "rgb(var(--success))",
        secondary: "rgb(var(--surface))",
      },
    });

/**
 * ERROR
 */
export const toastError = (message: string) =>
    toast.error(message, {
      ...base,
      iconTheme: {
        primary: "rgb(var(--error))",
        secondary: "rgb(var(--surface))",
      },
    });

/**
 * WARNING
 */
export const toastWarning = (message: string) =>
    toast(message, {
      ...base,
      icon: "⚠️",
      style: {
        borderColor: "rgb(var(--warning))",
      },
    });

/**
 * INFO
 */
export const toastInfo = (message: string) =>
    toast(message, {
      ...base,
      icon: "ℹ️",
      style: {
        borderColor: "rgb(var(--info))",
      },
    });