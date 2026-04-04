import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ColorScheme = 'light' | 'dark';

interface ThemeStore {
  colorScheme: ColorScheme;
  toggleColorScheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      colorScheme: 'dark',
      toggleColorScheme: () =>
        set((state) => ({
          colorScheme: state.colorScheme === 'dark' ? 'light' : 'dark',
        })),
    }),
    { name: 'theme-storage' },
  ),
);
