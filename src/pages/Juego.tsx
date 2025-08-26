// src/pages/Game.tsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGame } from "../context/GameContext";

export default function Game() {
  const { id } = useParams<{ id: string }>();
  const { currentQuestion, sendAnswer, endRound, players } = useGame();
  const navigate = useNavigate();

  const questionTime = currentQuestion?.tiempo_pregunta ?? 10;
  const [timeLeft, setTimeLeft] = useState<number>(questionTime);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);

  // reset timer when question changes
  useEffect(() => {
    setSelectedOption(null);
    setAnswered(false);
    setTimeLeft(currentQuestion?.tiempo_pregunta ?? questionTime);
  }, [currentQuestion]);

  // timer effect
  useEffect(() => {
    if (!currentQuestion) return;
    if (timeLeft <= 0) {
      // enviar sin respuesta si no contestó
      if (!answered) sendAnswer(currentQuestion.id, null);
      // backend manejará pasar a siguiente pregunta (o you can call endRound)
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, currentQuestion, answered]);

  // progress %
  const progress = useMemo(() => {
    const total = currentQuestion?.tiempo_pregunta ?? questionTime;
    return ((total - timeLeft) / total) * 100;
  }, [timeLeft, currentQuestion]);

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white font-['Irish_Grover']">
        <div className="bg-gray-200 text-black p-8 rounded-xl">
          <h2 className="text-xl mb-4">Esperando pregunta...</h2>
          <button onClick={() => navigate("/lobby")} className="px-4 py-2 bg-gray-700 text-white rounded">Volver al lobby</button>
        </div>
      </div>
    );
  }

  const onSelect = (opcionId: string) => {
    if (answered) return;
    setSelectedOption(opcionId);
    setAnswered(true);
    sendAnswer(currentQuestion.id, opcionId);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-6 font-['Irish_Grover']">
      <h1 className="text-4xl mb-2">TRIVIA</h1>
      <h2 className="text-xl mb-4">Sala: {id}</h2>

      <div className="bg-gray-200 text-black rounded-2xl p-6 w-11/12 max-w-4xl shadow-lg">
        <div className="flex justify-between mb-2">
          <span>Tema: —</span>
          <span>Pregunta</span>
          <span>{timeLeft}s</span>
        </div>

        <div className="w-full h-3 bg-gray-300 rounded mb-4 overflow-hidden">
          <div style={{ width: `${progress}%` }} className="h-3 bg-blue-500 transition-all duration-1000"></div>
        </div>

        <div className="bg-white rounded-lg p-4 mb-4 shadow">
          <p className="text-lg font-bold">{currentQuestion.text}</p>
        </div>

        <div className="flex flex-col gap-3">
          {currentQuestion.opciones.map((opt) => (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              className={`p-3 rounded-lg shadow text-left ${selectedOption === opt.id ? "bg-blue-400 text-white" : "bg-gray-300"} ${answered ? "opacity-80 cursor-not-allowed" : ""}`}
              disabled={answered}
            >
              {opt.text}
            </button>
          ))}
        </div>
      </div>

      <div className="w-11/12 max-w-4xl mt-6 flex justify-between">
        <div>
          <h3 className="text-white mb-2">Jugadores</h3>
          <div className="flex gap-2">
            {players.map((p) => (
              <div key={p.id} className="bg-white text-black p-2 rounded">{p.name} ({p.score})</div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={() => endRound()} className="px-4 py-2 bg-gray-400 text-black rounded">Cerrar Ronda</button>
          <button onClick={() => navigate("/ranking")} className="px-4 py-2 bg-gray-700 text-white rounded">Finalizar Juego</button>
        </div>
      </div>
    </div>
  );
}
