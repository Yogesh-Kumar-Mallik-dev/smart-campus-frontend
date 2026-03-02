// src/lib/auth.ts

import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp?: number;
}

/* ---------- LOGIN ---------- */
export const setAuth = (token: string): void => {
  localStorage.setItem("token", token);
  localStorage.setItem("auth", "true");
};

/* ---------- LOGOUT LOCAL ---------- */
export const clearAuth = (): void => {
  localStorage.removeItem("token");
  localStorage.removeItem("auth");
};

/* ---------- GET TOKEN ---------- */
export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

/* ---------- SECURE LOGIN CHECK ---------- */
export const isLoggedIn = (): boolean => {
  const token = localStorage.getItem("token");

  if (!token) {
    localStorage.removeItem("auth");
    return false;
  }

  try {
    const decoded = jwtDecode<DecodedToken>(token);

    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      clearAuth();
      return false;
    }

    return true;
  } catch {
    clearAuth();
    return false;
  }
};

/* ---------- BACKEND LOGOUT ---------- */
export const logout = async (): Promise<void> => {
  const token = localStorage.getItem("token");

  try {
    if (token) {
      await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/auth/logout`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );
    }
  } catch {
    // ignore network errors
  }

  clearAuth();
};