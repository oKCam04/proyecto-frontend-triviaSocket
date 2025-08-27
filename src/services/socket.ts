import { io, Socket } from 'socket.io-client';

const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333';

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (socket) return socket;

  const token = localStorage.getItem('token') || '';

  socket = io(BACKEND_URL, {
    transports: ['websocket'],   // estable y rápido con Adonis v6
    auth: { token },             // si luego verificas JWT en el backend
    autoConnect: true,
    withCredentials: true,
  });

  socket.on('connect', () => console.log('[socket] connected', socket?.id));
  socket.on('disconnect', (r) => console.log('[socket] disconnect', r));
  socket.on('connect_error', (e) => console.error('[socket] connect_error', e?.message || e));

  return socket;
}
