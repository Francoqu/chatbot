import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Carreras from "./pages/Carreras";
import Universidades from "./pages/Universidades"; // Asegúrate de que este archivo exista
import "./App.css";
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/carreras" element={<Carreras />} />
        <Route path="/universidades" element={<Universidades />} /> {/* ✅ Esta línea estaba fuera */}
      </Routes>
    </Router>
  );
}

export default App;
