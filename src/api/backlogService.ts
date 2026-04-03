import axios from 'axios';
import type { Game } from './gameService';

const backlogClient = axios.create({
  baseURL: 'http://localhost:3001',
});

export const getBacklog = async (): Promise<Game[]> => {
  const response = await backlogClient.get<Game[]>('/backlog');
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
