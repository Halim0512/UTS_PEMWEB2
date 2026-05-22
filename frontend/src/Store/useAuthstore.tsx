import { create } from "zustand";

interface AuthState {
  user: string | null;
  isLogin: boolean;

  login: (nim: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLogin: false,

  login: (nim) =>
    set({
      user: nim,
      isLogin: true,
    }),

  logout: () =>
    set({
      user: null,
      isLogin: false,
    }),
}));
