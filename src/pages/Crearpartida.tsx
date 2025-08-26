// src/pages/CrearPartida.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext";

export default function CrearPartida() {
  const { roomCode, startQuestion } = useGame();
  const navigate = useNavigate();

  const [texto, setTexto] = useState("");
  const [opcionesText, setOpcionesText] = useState(["", "", "", ""]);
  const [tiempo, setTiempo] = useState(10);
  const [correctIndex, setCorrectIndex] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const question = {
      id: String(Date.now()),
      text: texto,
      opciones: opcionesText.map((t, i) => ({ id: String(i), text: t, es_correcto: i === correctIndex })),
      tiempo_pregunta: tiempo,
    };
    startQuestion(question); // emite al backend
    // ir a la vista del juego en la misma sala
    navigate(`/games/${roomCode ?? "unknown"}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white font-['Irish_Grover'] p-6">
      <div className="bg-gray-200 text-black p-8 rounded-xl shadow-md w-[640px]">
        <h2 className="text-2xl mb-4">Crear Pregunta (moderador)</h2>
        <p className="mb-4">Código sala: <span className="font-bold">{roomCode ?? "—"}</span></p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <textarea required value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Texto de la pregunta" className="p-2 border rounded h-24" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {opcionesText.map((opt, i) => (
              <div key={i} className="flex items-center gap-2">
                <input className="flex-1 p-2 border rounded" value={opt} onChange={(e) => {
                  const copy = [...opcionesText]; copy[i] = e.target.value; setOpcionesText(copy);
                }} placeholder={`Opción ${i + 1}`} required />
                <label className="text-sm">
                  <input type="radio" checked={correctIndex === i} onChange={() => setCorrectIndex(i)} /> correcta
                </label>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <label>Tiempo (s):</label>
            <input type="number" value={tiempo} onChange={(e) => setTiempo(Number(e.target.value))} className="p-1 border rounded w-24" min={5} />
          </div>

          <div className="flex gap-3">
            <button type="submit" className="px-4 py-2 bg-gray-700 text-white rounded">Lanzar pregunta</button>
            <button type="button" onClick={() => navigate("/lobby")} className="px-4 py-2 bg-gray-400 text-black rounded">Volver</button>
          </div>
        </form>
      </div>
    </div>
  );
}
