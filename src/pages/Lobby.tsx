import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

type Room = {
  id: number
  nombre: string
  jugadores: number
  maxJugadores: number
  categoria: string
  preguntas: number
  tiempoRespuesta: number // en segundos
  codigo?: string
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3333"

export default function ListaPartidas() {
  const nav = useNavigate()
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch(`${API_URL}/partidas?status=waiting`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
            "Content-Type": "application/json",
          },
        })
        const data = await res.json()
        // adapta según tu API: data.data || data
        const list: Room[] = (data.data ?? data ?? []).map((p: any, i: number) => ({
          id: p.id,
          nombre: p.nombre ?? `Sala ${i + 1}`,
          jugadores: p.jugadores ?? p.players_count ?? 0,
          maxJugadores: p.max_jugadores ?? 10,
          categoria: p.categoria?.name ?? p.categoria ?? "General",
          preguntas: p.preguntas ?? p.questions_count ?? 10,
          tiempoRespuesta: p.tiempo_respuesta ?? p.answer_time ?? 15,
          codigo: p.codigo,
        }))
        setRooms(list)
      } catch {
        // Fallback de ejemplo para ver la UI
        setRooms([
          {
            id: 1,
            nombre: "Sala 1",
            jugadores: 5,
            maxJugadores: 10,
            categoria: "Capitales",
            preguntas: 20,
            tiempoRespuesta: 15,
            codigo: "ABCD12",
          },
        ])
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const entrar = (room: Room) => {
    // host inicia: solo entrar a la pantalla de juego/lobby-room
    nav(`/juego/${room.id}`)
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        {/* Header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-wide text-emerald-400 drop-shadow">
              TRIVIA
            </h1>
            <div className="mt-1 h-1 w-24 rounded bg-emerald-500/70" />
          </div>

          <div className="rounded-full border border-emerald-700/60 bg-neutral-800/60 px-4 py-1 text-sm">
            <span className="font-semibold text-emerald-400">Pública</span>
          </div>
        </div>

        {/* Botón título */}
        <div className="mb-6 flex justify-center">
          <div className="rounded-md border border-neutral-600 bg-neutral-800/70 px-6 py-2 text-lg shadow">
            Lista de Partidas
          </div>
          <button className="ml-4 rounded-md bg-emerald-600 px-4 py-2 text-white font-medium hover:bg-emerald-700 transition-colors duration-200 shadow">
            Crear Partida
          </button>

        </div>

        {/* Contenedor con borde verde */}
        <div className="rounded-2xl border border-emerald-600/60 bg-neutral-900/40 p-5 md:p-8">
          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-40 animate-pulse rounded-xl border border-neutral-700/60 bg-neutral-800/50"
                />
              ))}
            </div>
          ) : rooms.length === 0 ? (
            <div className="py-10 text-center text-neutral-400">
              No hay partidas disponibles por ahora.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className="group rounded-xl border border-emerald-700/40 bg-neutral-800/70 p-5 shadow transition hover:border-emerald-500/80 hover:shadow-lg"
                >
                  <div className="mb-3 text-lg font-semibold text-neutral-100">
                    <h3 className="mb-3 text-lg font-semibold text-neutral-100 text-center">Sala 1</h3>
                  </div>

                  <ul className="space-y-1 text-sm text-neutral-300">
                    <li>
                      <span className="text-neutral-400">Jugadores:</span>{" "}
                      {room.jugadores}/{room.maxJugadores}
                    </li>
                    <li>
                      <span className="text-neutral-400">Categoría:</span>{" "}
                      {room.categoria}
                    </li>
                    <li>
                      <span className="text-neutral-400">Preguntas:</span>{" "}
                      {room.preguntas}
                    </li>
                    <li>
                      <span className="text-neutral-400">Tiempo Respuesta:</span>{" "}
                      {room.tiempoRespuesta}s
                    </li>
                    {room.codigo ? (
                      <li>
                        <span className="text-neutral-400">Código:</span>{" "}
                        <span className="font-mono text-emerald-400">
                          {room.codigo}
                        </span>
                      </li>
                    ) : null}
                  </ul>

                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => entrar(room)}
                      className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    >
                      Entrar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
