import { apiClient } from './apiClient';

// Tipagem básica focada no que a UI vai precisar
export interface Game {
  id: number;
  name: string;
  background_image: string; // A RAWG manda as imagens das capas aqui
  rating: number;
}

// A RAWG sempre retorna os dados dentro de um array chamado "results"
interface FetchGamesResponse {
  results: Game[];
}

export const getGames = async (): Promise<Game[]> => {
  // Olha como fica limpo: só pedimos a rota '/games'
  const response = await apiClient.get<FetchGamesResponse>('/games');

  // Já retornamos direto o array de jogos para facilitar a vida do front-end
  return response.data.results;
};

export const searchGames = async (query: string): Promise<Game[]> => {
  const response = await apiClient.get<FetchGamesResponse>('/games', {
    params: {
      search: query,
      page_size: 10, // Boa prática: limitar a 10 resultados para não pesar a tela
    },
  });

  return response.data.results;
};
