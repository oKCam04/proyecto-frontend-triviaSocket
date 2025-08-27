import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor para añadir el token de autenticación a las cabeceras
api.interceptors.request.use(
  (config) => {
    // Corregido: Usar la clave "token" para obtener el dato del localStorage
    const token = localStorage.getItem('token'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- Funciones de la API para Partidas ---

/**
 * Obtiene la lista de partidas con estado 'disponible'
 */
export const getActivePartidas = async () => {
  try {
    const response = await api.get('/partidas');
    return response.data;
  } catch (error) {
    console.error('Error fetching active partidas:', error);
    throw error;
  }
};

/**
 * Llama al endpoint del backend para crear una nueva partida
 */
export const createPartida = async () => {
  try {
    const response = await api.post('/partidas');
    return response.data;
  } catch (error) {
    console.error('Error creating partida:', error);
    throw error;
  }
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});