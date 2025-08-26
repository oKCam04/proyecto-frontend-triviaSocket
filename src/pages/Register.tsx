// src/pages/Register.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {api} from "../api"

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [rol, setRol] = useState<"player" | "admin">("player");
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try{
      await api.post("/auth/login",{
        username,
        email,
        password,
        rol
      })
      alert("Registro exitoso, logeate")

    }catch(err: any){
        alert(`su error es: ${err}`)
    }
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white font-['Irish_Grover']">
      <div className="bg-gray-200 text-black p-8 rounded-xl shadow-md w-[420px]">
        <h2 className="text-2xl mb-4">Crear cuenta</h2>
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <input value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Username" type="text" className="p-2 border rounded" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" className="p-2 border rounded" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" type="password" className="p-2 border rounded" required />
          <div>
            <label className="mr-2">
              <input type="radio" checked={rol === "player"} onChange={() => setRol("player")} /> Jugador
            </label>
            <label>
              <input type="radio" checked={rol === "admin"} onChange={() => setRol("admin")} /> Moderador
            </label>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="px-4 py-2 bg-gray-700 text-white rounded">Crear</button>
            <button type="button" onClick={() => navigate("/")} className="px-4 py-2 bg-gray-400 text-black rounded">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
