import { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBacklog, addToBacklog, removeFromBacklog } from '../api/backlogService';
import type { Game } from '../api/gameService';

const BACKLOG_KEY = ['backlog'];

export function useBacklog() {
  const queryClient = useQueryClient();

  const { data: gameBacklog = [], isLoading } = useQuery({
    queryKey: BACKLOG_KEY,
    queryFn: getBacklog,
  });

  const activeBacklog = useMemo(
    () => gameBacklog.filter((g) => g.status !== 'finished'),
    [gameBacklog],
  );

  const playingGames = useMemo(
    () => gameBacklog.filter((g) => g.status === 'playing'),
    [gameBacklog],
  );

  const finishedGames = useMemo(
    () =>
      gameBacklog
        .filter((g) => g.status === 'finished')
        .sort((a, b) => (b.user_rating ?? 0) - (a.user_rating ?? 0)),
    [gameBacklog],
  );

  const addMutation = useMutation({
    mutationFn: addToBacklog,
    onMutate: async (game: Game) => {
      await queryClient.cancelQueries({ queryKey: BACKLOG_KEY });
      const previous = queryClient.getQueryData<Game[]>(BACKLOG_KEY);
      queryClient.setQueryData<Game[]>(BACKLOG_KEY, (old = []) => {
        if (old.some((g) => g.id === game.id)) return old;
        return [...old, game];
      });
      return { previous };
    },
    onError: (_err, _game, context) => {
      if (context?.previous) {
        queryClient.setQueryData(BACKLOG_KEY, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: BACKLOG_KEY });
    },
  });

  const removeMutation = useMutation({
    mutationFn: removeFromBacklog,
    onMutate: async (gameId: number) => {
      await queryClient.cancelQueries({ queryKey: BACKLOG_KEY });
      const previous = queryClient.getQueryData<Game[]>(BACKLOG_KEY);
      queryClient.setQueryData<Game[]>(BACKLOG_KEY, (old = []) =>
        old.filter((g) => g.id !== gameId),
      );
      return { previous };
    },
    onError: (_err, _gameId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(BACKLOG_KEY, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: BACKLOG_KEY });
    },
  });

  return {
    gameBacklog,
    activeBacklog,
    playingGames,
    finishedGames,
    isLoadingBacklog: isLoading,
    addGame: (game: Game) => addMutation.mutate(game),
    removeGame: (gameId: number) => removeMutation.mutate(gameId),
  };
}
