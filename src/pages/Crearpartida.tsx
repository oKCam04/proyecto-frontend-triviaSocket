// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useGame } from "../context/GameContext";
// import {api} from '../api'

// export default function CrearPartida() {
//   const { roomCode, startQuestion } = useGame();
//   const navigate = useNavigate();

//   const [texto, setTexto] = useState("");
//   const [opcionesText, setOpcionesText] = useState(["", "", "", ""]);
//   const [tiempo, setTiempo] = useState(30);
//   const [correctIndex, setCorrectIndex] = useState<number | null>(null);

//   // 🟩 Estados para el modal de categoría
//   const [showCategoriaModal, setShowCategoriaModal] = useState(false);
//   const [nuevaCategoria, setNuevaCategoria] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const question = {
//       id: String(Date.now()),
//       text: texto,
//       opciones: opcionesText.map((t, i) => ({
//         id: String(i),
//         text: t,
//         es_correcto: i === correctIndex,
//       })),
//       tiempo_pregunta: tiempo,
//     };
//     startQuestion(question);
//     navigate(`/games/${roomCode ?? "unknown"}`);
//   };

//   return (
//     <div className="min-h-screen bg-[#1a1a1a] text-white font-['Irish_Grover'] p-8">
//       {/* 🟩 MODAL CATEGORÍA */}
//       {showCategoriaModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-10 z-50 flex items-center justify-center">
//           <div className="bg-[#1a1a1a] border border-green-600 rounded-xl p-6 w-full max-w-md text-white relative">
//             <button
//               onClick={() => setShowCategoriaModal(false)}
//               className="absolute top-2 right-3 text-white text-xl"
//             >
//               &times;
//             </button>
//             <h3 className="text-xl font-bold mb-4 text-green-500">Registrar Categoría</h3>
//             <form
//               onSubmit={ async (e) => {
//                 e.preventDefault();
//                 try{
//                   const response= await api.post('/categoria',{
//                     name: nuevaCategoria
//                   })
//                   alert("Registro exitoso")
//                 }catch(error){
//                   console.error("Error al registrar categoría:", error);
//                 }
//                 setShowCategoriaModal(false);
//                 setNuevaCategoria("");
//               }}
//               className="space-y-4"
//             >
//               <div>
//                 <label className="block mb-1">Nombre de la categoría:</label>
//                 <input
//                   type="text"
//                   required
//                   value={nuevaCategoria}
//                   onChange={(e) => setNuevaCategoria(e.target.value)}
//                   className="w-full p-2 rounded bg-black border border-white/30 text-white focus:outline-none"
//                 />
//               </div>
//               <button type="submit" className="bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700">
//                 Guardar
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Vista principal */}
//       <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start border-t border-white/20 pt-8">
//         {/* Columna izquierda - Pregunta */}
//         <div>
//           <h1 className="text-4xl text-green-500 mb-6">TRIVIA</h1>

//           <div className="flex gap-4 mb-6">
//             <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
//               + pregunta
//             </button>
//             <button
//               onClick={() => setShowCategoriaModal(true)}
//               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
//             >
//               + Categoría
//             </button>
//           </div>

//           <ul className="space-y-2 text-white">
//             <li className="border-b border-white/30 pb-1">¿Cuál es la capital de París?</li>
//             <li className="border-b border-white/30 pb-1">¿Cuál es la capital de Arauca?</li>
//             <li className="border-b border-white/30 pb-1">¿Cuál es la capital de Inglaterra?</li>
//           </ul>
//         </div>

//         {/* Columna derecha - Configuración */}
//         <div>
//           <h2 className="text-2xl text-white mb-6 text-center">Preguntas</h2>

//           <div className="space-y-4 text-green-500">
//             <div>
//               <p className="text-sm">Tiempo (segundos)</p>
//               <p className="text-2xl text-white border-b border-white/30">{tiempo}s</p>
//             </div>

//             <div>
//               <p className="text-sm">N participantes:</p>
//               <p className="text-2xl text-white border-b border-white/30">20</p>
//             </div>

//             <div>
//               <p className="text-sm">Temática:</p>
//               <select className="bg-transparent border-b border-white/30 text-white w-full">
//                 <option value="capitales" className="text-black">Capitales</option>
//                 {/* Agrega más opciones dinámicamente si lo deseas */}
//               </select>
//             </div>
//           </div>

//           <div className="mt-6 flex justify-end">
//             <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
//               Guardar
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
