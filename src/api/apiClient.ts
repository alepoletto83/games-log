import axios from 'axios';

// Instância customizada do Axios
export const apiClient = axios.create({
  baseURL: 'https://api.rawg.io/api',
  params: {
    key: import.meta.env.VITE_RAWG_API_KEY,
  },
});
