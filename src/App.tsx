// src/App.tsx
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GameProvider } from "./context/GameContext";

import Login from "./pagues/Login";
import Register from "./pagues/Register";
import Lobby from "./pagues/Lobby";
import Game from "./pagues/Juego";
import CrearPartida from "./pagues/CrearPartida";
import EndGame from "./pagues/Ranking";

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
