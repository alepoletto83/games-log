import { create } from 'zustand';
import type { Game } from '../api/gameService';
import { persist, createJSONStorage } from 'zustand/middleware';

interface BacklogState {
  gameBacklog: Game[];
  addGame: (game: Game) => void;
  removeGame: (gameId: number) => void;
}

export const useBacklogStore = create<BacklogState>()(
  persist(
    (set) => ({
      gameBacklog: [],

      addGame: (game) =>
        set((state) => {
          if (state.gameBacklog.some((g) => g.id === game.id)) return state;
          return { gameBacklog: [...state.gameBacklog, game] };
        }),

      removeGame: (gameId) =>
        set((state) => ({
          gameBacklog: state.gameBacklog.filter((g) => g.id !== gameId),
        })),
    }),
    {
      name: 'games-log-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
