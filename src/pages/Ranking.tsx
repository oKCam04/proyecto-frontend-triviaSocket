// // src/pages/EndGame.tsx
// import { useNavigate } from "react-router-dom";
// import { useGame } from "../context/GameContext";

// export default function EndGame() {
//   const navigate = useNavigate();
//   const { players } = useGame();

//   // orden descendente por score
//   const sorted = [...players].sort((a, b) => b.score - a.score);

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-black font-['Irish_Grover']">
//       <div className="bg-gray-200 p-10 rounded-2xl shadow-lg w-[700px] text-center">
//         <h1 className="text-3xl mb-6">Fin de partida</h1>

//         <div className="bg-white rounded-xl shadow-md p-6">
//           <h2 className="text-xl mb-4">Mejores</h2>
//           <div className="flex flex-col gap-3">
//             {sorted.map((p, i) => (
//               <div key={p.id} className="flex justify-between items-center bg-gray-100 p-3 rounded-xl shadow-sm">
//                 <span>{i + 1}. {p.name}</span>
//                 <span className="font-bold">{p.score} Puntos</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="flex justify-center gap-6 mt-6">
//           <button onClick={() => navigate("/lobby")} className="px-6 py-2 rounded-xl bg-gray-300 hover:bg-gray-400 shadow">lista de partidas</button>
//           <button onClick={() => navigate("/crear-partida")} className="px-6 py-2 rounded-xl bg-gray-300 hover:bg-gray-400 shadow">¡Revancha!</button>
//         </div>
//       </div>
//     </div>
//   );
// }
