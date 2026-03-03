import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthUser {
  id: string;
  full_name: string;   // updated
  roles: string[];
}

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  hydrated: boolean;

  login: (data: { token: string; user: AuthUser }) => void;
  logout: () => void;
  setHydrated: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
          token: null,
          user: null,
          hydrated: false,

          login: ({ token, user }) => {
            set({ token, user });
          },

          logout: () => {
            set({ token: null, user: null });
          },

          setHydrated: () => {
            set({ hydrated: true });
          },
        }),
        {
          name: "smart-campus-auth",

          onRehydrateStorage: () => (state) => {
            state?.setHydrated();
          },
        }
    )
);