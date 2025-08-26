// src/App.tsx
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GameProvider } from "./context/GameContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Lobby from "./pages/Lobby";
import Game from "./pages/Juego";
import CrearPartida from "./pages/CrearPartida";
import EndGame from "./pages/Ranking";

function App() {
  return (
    <GameProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/crear-partida" element={<CrearPartida />} />
          <Route path="/games/:id" element={<Game />} />
          <Route path="/ranking" element={<EndGame />} />
        </Routes>
      </Router>
    </GameProvider>
  );
}

export default App;
