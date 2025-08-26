// src/services/socket.ts
import { io } from "socket.io-client";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:3333";

const socket = io(BACKEND_URL, {
  transports: ["websocket"],
  autoConnect: true,
});

export default socket;
