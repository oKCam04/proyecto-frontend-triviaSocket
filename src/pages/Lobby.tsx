// src/pages/Lobby.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext";

export default function Lobby() {
  const navigate = useNavigate();
  const { createRoom, joinRoom } = useGame();
  const [codeInput, setCodeInput] = useState("");
  const [roomsList, setRoomsList] = useState<{ code: string; status: string }[]>([]);

  useEffect(() => {
    // opcional: pedir lista de salas al backend vía HTTP o socket
    // socket.emit("rooms:list", {}, (rooms) => setRoomsList(rooms));
    // por ahora mock
    setRoomsList([{ code: "AB12", status: "open" }, { code: "CD34", status: "playing" }]);
  }, []);

  const handleCreate = async () => {
    const code = await createRoom();
    if (code) {
      // el moderador queda en la sala — mostrar pantalla de sala o crear partida
      navigate("/crear-partida");
    }
  };

  const handleJoin = () => {
    const nickname = localStorage.getItem("nickname") || "invitado";
    joinRoom(codeInput.trim(), nickname);
    navigate(`/games/${codeInput.trim()}`);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-10 font-['Irish_Grover']">
      <img src="/logo-trivia.png" alt="logo" className="w-48 mb-8" />
      <div className="flex gap-4 mb-6">
        <button onClick={handleCreate} className="bg-white text-black px-6 py-3 rounded-md hover:bg-gray-200">Crear sala (soy moderador)</button>
      </div>

      <div className="bg-white text-black p-6 rounded-xl w-[600px] mb-8">
        <h3 className="mb-2">Unirse a sala</h3>
        <div className="flex gap-2">
          <input value={codeInput} onChange={(e) => setCodeInput(e.target.value)} placeholder="Código ej: AB12" className="p-2 border rounded flex-1" />
          <button onClick={handleJoin} className="px-4 bg-gray-700 text-white rounded">Unirse</button>
        </div>
      </div>

      <div className="w-full max-w-5xl px-4">
        <h3 className="text-xl mb-4">Salas públicas (ejemplo)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {roomsList.map(r => (
            <div key={r.code} className="bg-white text-black p-4 rounded">
              <div className="flex justify-between">
                <div>
                  <p className="font-bold">Sala {r.code}</p>
                  <p className="text-sm">Status: {r.status}</p>
                </div>
                <div>
                  <button onClick={() => { setCodeInput(r.code); }} className="px-3 py-1 bg-gray-200 rounded">Usar código</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
