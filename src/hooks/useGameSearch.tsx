import { useQuery } from '@tanstack/react-query';
import { searchGames } from '../api/gameService';

export const useGameSearch = (searchTerm: string) => {
  return useQuery({
    queryKey: ['games-search', searchTerm],
    queryFn: () => searchGames(searchTerm),
    enabled: !!searchTerm,
    // Mantém o resultado em cache por 5 minutos
    staleTime: 1000 * 60 * 5,
  });
};
