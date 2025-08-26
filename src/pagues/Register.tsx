// src/pages/Register.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"player" | "moderator">("player");
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Llamar al backend /register
    // ahora solo guardamos el nickname para testear
    localStorage.setItem("nickname", username || email || "invitado");
    navigate("/lobby");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white font-['Irish_Grover']">
      <div className="bg-gray-200 text-black p-8 rounded-xl shadow-md w-[420px]">
        <h2 className="text-2xl mb-4">Crear cuenta</h2>
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nombre" className="p-2 border rounded" required />
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" className="p-2 border rounded" />
          <div>
            <label className="mr-2">
              <input type="radio" checked={role === "player"} onChange={() => setRole("player")} /> Jugador
            </label>
            <label>
              <input type="radio" checked={role === "moderator"} onChange={() => setRole("moderator")} /> Moderador
            </label>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="px-4 py-2 bg-gray-700 text-white rounded">Crear</button>
            <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-400 text-black rounded">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
