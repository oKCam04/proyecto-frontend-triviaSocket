
import React, { createContext, useContext, useEffect, useState } from "react";
import { socket } from "../services/socket";

export type Player = {
  id: string;
  name: string;
  score: number;
};

export type Option = {
  id: string;
  text: string;
  es_correcto?: boolean;
};

export type Question = {
  id: string;
  text: string;
  opciones: Option[];
  tiempo_pregunta: number; // segundos
};

type GameContextType = {
  roomCode: string | null;
  players: Player[];
  currentQuestion: Question | null;
  isModerator: boolean;
  setRoomCode: (code: string | null) => void;
  createRoom: () => Promise<string | null>;
  joinRoom: (code: string, nickname: string) => void;
  startQuestion: (q: Partial<Question>) => void;
  sendAnswer: (preguntaId: string, opcionId: string | null) => void;
  endRound: () => void;
  leaveRoom: () => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [isModerator, setIsModerator] = useState(false);

  useEffect(() => {
    socket.on("room:state", (payload: { code: string; players: Player[] }) => {
      setRoomCode(payload.code);
      setPlayers(payload.players);
    });

    socket.on("room:players", (payload: Player[]) => {
      setPlayers(payload);
    });

    socket.on("game:question", (question: Question) => {
      setCurrentQuestion(question);
    });

    socket.on("game:endQuestion", () => {
      setCurrentQuestion(null);
    });

    socket.on("game:score", (playersUpdated: Player[]) => {
      setPlayers(playersUpdated);
    });

    socket.on("room:left", () => {
      setRoomCode(null);
      setPlayers([]);
      setCurrentQuestion(null);
      setIsModerator(false);
    });

    return () => {
      socket.off("room:state");
      socket.off("room:players");
      socket.off("game:question");
      socket.off("game:endQuestion");
      socket.off("game:score");
      socket.off("room:left");
    };
  }, []);

  const createRoom = (): Promise<string | null> =>
    new Promise((resolve) => {
      socket.emit("room:create", {}, (response: { ok: boolean; code?: string }) => {
        if (response?.ok && response.code) {
          setRoomCode(response.code);
          setIsModerator(true);
          resolve(response.code);
        } else resolve(null);
      });
    });

  const joinRoom = (code: string, nickname: string) => {
    socket.emit("room:join", { code, nickname }, (res: { ok: boolean; reason?: string }) => {
      if (!res.ok) console.warn("joinRoom failed:", res.reason);
    });
  };

  const startQuestion = (q: Partial<Question>) => {
    socket.emit("game:startQuestion", q);
  };

  const sendAnswer = (preguntaId: string, opcionId: string | null) => {
    socket.emit("game:answer", { preguntaId, opcionId });
  };

  const endRound = () => {
    socket.emit("game:endRound");
  };

  const leaveRoom = () => {
    socket.emit("room:leave");
    setRoomCode(null);
    setPlayers([]);
    setCurrentQuestion(null);
    setIsModerator(false);
  };

  return (
    <GameContext.Provider
      value={{
        roomCode,
        players,
        currentQuestion,
        isModerator,
        setRoomCode,
        createRoom,
        joinRoom,
        startQuestion,
        sendAnswer,
        endRound,
        leaveRoom,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used inside GameProvider");
  return ctx;
};
