import axios from 'axios';
import type { Game } from './gameService';

const backlogClient = axios.create({
  baseURL: 'http://localhost:3001',
});

export interface BacklogGame extends Game {
  status: 'playing' | 'finished' | 'dropped';
  user_rating: number | null;
  description: string | null;
  started_at: string;
  finished_at: string | null;
}

export const getBacklog = async (): Promise<BacklogGame[]> => {
  const response = await backlogClient.get<BacklogGame[]>('/backlog');
  return response.data;
};

export const getBacklogGame = async (id: number): Promise<BacklogGame> => {
  const response = await backlogClient.get<BacklogGame>(`/backlog/${id}`);
  return response.data;
};

export interface UpdateBacklogPayload {
  status: string;
  user_rating: number | null;
  description: string | null;
  finished_at: string | null;
}

export const updateBacklogGame = async (
  id: number,
  data: UpdateBacklogPayload,
): Promise<BacklogGame> => {
  const response = await backlogClient.put<BacklogGame>(`/backlog/${id}`, data);
  return response.data;
};

export const addToBacklog = async (game: Game): Promise<Game> => {
  const response = await backlogClient.post<Game>('/backlog', {
    id: game.id,
    name: game.name,
    background_image: game.background_image,
    rating: game.rating,
  });
  return response.data;
};

export const removeFromBacklog = async (gameId: number): Promise<void> => {
  await backlogClient.delete(`/backlog/${gameId}`);
};
