import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getActivePartidas, createPartida } from '../api';

// Asumo que el objeto Partida que viene de la API tiene esta forma
interface Partida {
  id: number;
  codigo: string;
  status: string;
}

export default function Lobby() {
  const [partidas, setPartidas] = useState<Partida[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPartidas = async () => {
      try {
        setIsLoading(true);
        const activePartidas = await getActivePartidas();
        setPartidas(activePartidas);
      } catch (error) {
        console.error('No se pudieron cargar las partidas', error);
        // Aquí podrías manejar el caso en que el token haya expirado
        // y redirigir al login, por ejemplo: navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPartidas();
  }, []);

  const handleCreatePartida = async () => {
    try {
      const newPartida = await createPartida();
      navigate(`/games/${newPartida.id}`); // Corregido
    } catch (error) {
      alert('Error al crear la partida. Inténtalo de nuevo.');
    }
  };

  const handleJoinPartida = (partidaId: number) => {
    navigate(`/games/${partidaId}`); // Corregido
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black text-white font-['Irish_Grover'] p-6">
      <div className="w-full max-w-2xl flex flex-col items-center">
        <img src="/logo-trivia.png" alt="Trivia Logo" className="w-40 mb-4" />
        <h1 className="text-5xl mb-2">Salas Disponibles</h1>
        <p className="mb-8 text-gray-400">Únete a una sala o crea la tuya</p>

        <div className="w-full mb-8">
          <button 
            onClick={handleCreatePartida} 
            className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-3 rounded-full transition text-lg"
          >
            + Crear Nueva Partida
          </button>
        </div>

        <div className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-4">
          {isLoading ? (
            <p className="text-center text-gray-400">Cargando salas...</p>
          ) : partidas.length > 0 ? (
            <ul className="space-y-3">
              {partidas.map((partida) => (
                <li key={partida.id} className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
                  <div>
                    <p className="font-semibold">Sala</p>
                    <p className="text-2xl tracking-widest">{partida.codigo}</p>
                  </div>
                  <button 
                    onClick={() => handleJoinPartida(partida.id)}
                    className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-full transition"
                  >
                    Unirse
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-400">No hay salas disponibles. ¡Crea una!</p>
          )}
        </div>
      </div>
    </div>
  );
}
