import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Carreras from "./pages/Carreras";
import Universidades from "./pages/Universidades"; // Asegúrate que existe este archivo

import "./App.css";
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

// Importa PrivateRoute (crea este componente, te dejo abajo ejemplo)
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route 
          path="/chat" 
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          } 
        />

        <Route path="/carreras" element={<Carreras />} />
        <Route path="/universidades" element={<Universidades />} />
        <Route path="/universidad" element={<Universidades />} /> {/* Si quieres tener ambas rutas */}
      </Routes>
    </Router>
  );
}

export default App;
