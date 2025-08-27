// import { useEffect, useState, useMemo } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { socket } from '../services/socket';

// // --- Tipos de Datos del Frontend ---
// interface Player {
//   id: number;
//   username: string;
// }

// interface Question {
//   id: number;
//   pregunta: string;
//   opciones: { id: number; opcion: string }[];
// }

// interface AnswerResult {
//   correct: boolean;
// }

// interface RankingPlayer {
//   username: string;
//   score: number;
// }

// export default function Juego() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const partidaId = Number(id);

//   const [players, setPlayers] = useState<Player[]>([]);
//   const [question, setQuestion] = useState<Question | null>(null);
//   const [gameStatus, setGameStatus] = useState('waiting'); // waiting, playing, finished
//   const [ranking, setRanking] = useState<RankingPlayer[]>([]);
//   const [answerResult, setAnswerResult] = useState<AnswerResult | null>(null);
//   const [selectedOption, setSelectedOption] = useState<number | null>(null);

//   const currentUser = useMemo(() => {
//     const userStr = localStorage.getItem('user');
//     if (!userStr) return null;
//     const user = JSON.parse(userStr);
//     // Asegurarnos de que el id es un número para el backend
//     return { ...user, id: Number(user.id) };
//   }, []);

//   useEffect(() => {
//     if (!currentUser) {
//       navigate('/login');
//       return;
//     }

//     socket.connect();
//     socket.emit('joinRoom', { partidaId, user: currentUser });

//     const onUpdatePlayers = (players: Player[]) => setPlayers(players);
//     const onNewQuestion = (q: Question) => {
//       setGameStatus('playing');
//       setQuestion(q);
//       setAnswerResult(null);
//       setSelectedOption(null);
//     };
//     const onAnswerResult = (res: AnswerResult) => setAnswerResult(res);
//     const onEndGame = () => setGameStatus('finished');
//     const onRanking = (r: RankingPlayer[]) => setRanking(r);
//     const onError = (err: { message: string }) => alert(`Error: ${err.message}`);

//     socket.on('updatePlayers', onUpdatePlayers);
//     socket.on('newQuestion', onNewQuestion);
//     socket.on('answerResult', onAnswerResult);
//     socket.on('endGame', onEndGame);
//     socket.on('ranking', onRanking);
//     socket.on('error', onError);

//     return () => {
//       socket.off('updatePlayers', onUpdatePlayers);
//       socket.off('newQuestion', onNewQuestion);
//       socket.off('answerResult', onAnswerResult);
//       socket.off('endGame', onEndGame);
//       socket.off('ranking', onRanking);
//       socket.off('error', onError);
//       socket.disconnect();
//     };
//   }, [partidaId, currentUser, navigate]);

//   const handleStartGame = () => {
//     socket.emit('startGame', { partidaId });
//   };

//   const handleSendAnswer = (opcionId: number) => {
//     if (selectedOption) return; // Evitar doble respuesta
//     setSelectedOption(opcionId);
//     socket.emit('sendAnswer', { 
//       partidaId,
//       preguntaId: question?.id,
//       opcionId,
//       userId: currentUser?.id 
//     });
//   };

//   const getOptionClass = (opcionId: number) => {
//     if (!answerResult) {
//       return selectedOption === opcionId ? 'bg-yellow-500' : 'bg-gray-700 hover:bg-gray-600';
//     }
//     if (selectedOption === opcionId) {
//       return answerResult.correct ? 'bg-green-600' : 'bg-red-600';
//     }
//     return 'bg-gray-800'; // Otras opciones
//   }

//   return (
//     <div className="min-h-screen w-full flex bg-black text-white font-['Irish_Grover'] p-4">
//       {/* Columna de Jugadores */}
//       <div className="w-1/4 bg-gray-900/50 border border-gray-700 rounded-lg p-4 flex flex-col">
//         <h2 className="text-2xl mb-4 text-center">Jugadores</h2>
//         <ul className="space-y-3 flex-grow">
//           {players.map(p => <li key={p.id} className="bg-gray-800 p-3 rounded-lg text-lg">{p.username}</li>)}
//         </ul>
//       </div>

//       {/* Columna Principal del Juego */}
//       <div className="w-3/4 flex flex-col items-center justify-center px-8">
//         {gameStatus === 'waiting' && (
//           <div className="text-center">
//             <h1 className="text-5xl mb-4">Sala de Espera</h1>
//             <p className="text-gray-400 mb-8">¡Invita a tus amigos con el código de la sala!</p>
//             <button onClick={handleStartGame} className="bg-green-600 hover:bg-green-500 text-white font-semibold py-3 px-12 rounded-full transition text-2xl">
//               ¡Empezar Partida!
//             </button>
//           </div>
//         )}

//         {gameStatus === 'playing' && question && (
//           <div className="w-full max-w-3xl text-center">
//             <h2 className="text-4xl mb-6">{question.pregunta}</h2>
//             <div className="grid grid-cols-2 gap-4">
//               {question.opciones.map(op => (
//                 <button 
//                   key={op.id} 
//                   onClick={() => handleSendAnswer(op.id)}
//                   disabled={!!selectedOption}
//                   className={`p-4 rounded-lg text-xl transition ${getOptionClass(op.id)}`}
//                 >
//                   {op.opcion}
//                 </button>
//               ))}
//             </div>
//             {answerResult && (
//               <p className={`mt-6 text-3xl font-bold ${answerResult.correct ? 'text-green-500' : 'text-red-500'}`}>
//                 {answerResult.correct ? '¡Correcto!' : 'Incorrecto'}
//               </p>
//             )}
//           </div>
//         )}

//         {gameStatus === 'finished' && (
//           <div className="text-center">
//             <h1 className="text-6xl mb-4">Partida Finalizada</h1>
//             <h2 className="text-4xl mb-8">Ranking Final</h2>
//             <div className="w-full max-w-md bg-gray-900/50 border border-gray-700 rounded-lg p-6">
//               {ranking.length > 0 ? (
//                 <ol className="space-y-4 text-2xl">
//                   {ranking.map((r, i) => (
//                     <li key={i} className="flex items-center gap-4">
//                       <span className="font-bold text-3xl">{i + 1}.</span>
//                       <span>{r.username}</span>
//                       <span className="ml-auto font-bold">{r.score * 10} Puntos</span>
//                     </li>
//                   ))}
//                 </ol>
//               ) : <p>No hay ranking disponible.</p>}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }