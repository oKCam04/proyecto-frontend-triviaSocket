// src/pages/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí normalmente llamas a login backend; por ahora navegamos al lobby
    // Puedes guardar user en localStorage si quieres
    localStorage.setItem("nickname", nombre || correo || "invitado");
    navigate("/lobby");
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-black text-white font-['Irish_Grover']">
      <div className="w-full max-w-md flex flex-col items-center px-6">
        <img src="/logo-trivia.png" alt="Trivia Logo" className="w-48 mb-6" />
        <h2 className="text-4xl mb-1">Login</h2>
        <p className="mb-6 text-gray-400">¡Bienvenido!</p>

        <form onSubmit={submit} className="w-full flex flex-col gap-4">
          <div>
            <label className="block text-sm mb-1">Nombre</label>
            <input
              required
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-3 py-2 rounded bg-transparent border-b border-gray-400 focus:outline-none focus:border-white"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Correo (opcional)</label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="w-full px-3 py-2 rounded bg-transparent border-b border-gray-400 focus:outline-none focus:border-white"
            />
          </div>

          <button type="submit" className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 rounded-full transition">
            Ingresar
          </button>
        </form>

        <div className="mt-4 flex gap-6 text-sm text-gray-400">
          <button onClick={() => navigate("/register")} className="hover:text-white transition">
            Crear cuenta
          </button>
        </div>
      </div>
    </div>
  );
}
