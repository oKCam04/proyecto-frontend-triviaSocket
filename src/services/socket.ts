
import { io } from 'socket.io-client';

// Asegúrate de que la URL apunta a tu servidor de AdonisJS
const SOCKET_URL = 'http://localhost:3333';

export const socket = io(SOCKET_URL, {
  autoConnect: false, // Conectamos manualmente cuando el usuario entra a una sala
  transports: ['websocket'], // Forzar websockets para evitar problemas de CORS con polling
});
