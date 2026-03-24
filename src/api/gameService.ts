import { apiClient } from './apiClient';

export interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number;
}

export interface GameDetail extends Game {
  description: string;
  genres: { id: number; name: string }[];
  platforms: { platform: { id: number; name: string } }[];
  website: string;
}

interface GetGamesResponse {
  results: Game[];
}

export const getGames = async (): Promise<Game[]> => {
  const response = await apiClient.get<GetGamesResponse>('/games');

  return response.data.results;
};

export const getGameByID = async (id: number): Promise<GameDetail> => {
  const response = await apiClient.get<GameDetail>(`/games/${id}`);
  return response.data;
};

export const searchGames = async (query: string): Promise<Game[]> => {
  const response = await apiClient.get<GetGamesResponse>('/games', {
    params: {
      search: query,
      page_size: 10,
    },
  });

  return response.data.results;
};
