import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Carreras.css";
import ososImage from "../assets/ososbuscando-sinfondo.png";
import { carreras } from "./infocarreras";

const Carreras = () => {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");

  const carrerasFiltradas = carreras.filter((carrera) =>
    carrera.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="app-container">
      <header className="header">
        <img src={ososImage} alt="Oso Buscando" className="logo" />
        <h1 className="header-title">Carreras Universitarias en Ecuador</h1>
      </header>

      <main className="main-content">
        <section className="search-section">
          <input
            type="search"
            placeholder="🔍 Buscar carrera..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="search-input"
            autoFocus
            aria-label="Buscar carrera"
          />
        </section>

        <section className="cards-section">
          {carrerasFiltradas.length === 0 ? (
            <p className="no-results">No se encontraron resultados</p>
          ) : (
            carrerasFiltradas.map((carrera, i) => (
              <article key={i} className="card">
                <img
                  src={carrera.imagen}
                  alt={carrera.nombre}
                  className="card-image"
                  loading="lazy"
                />
                <div className="card-content">
                  <h2 className="card-title">{carrera.nombre}</h2>
                  <p className="card-duration">
                    <strong>Duración:</strong> {carrera.duracion}
                  </p>
                  <p className="card-description">{carrera.descripcion}</p>
                  <p className="card-universities">
                    <strong>Universidades:</strong> {carrera.universidades.join(", ")}
                  </p>
                  <button
                    className="btn-info"
                    onClick={() => window.open(carrera.urlSenescyt, "_blank")}
                    disabled={!carrera.urlSenescyt}
                    title={
                      carrera.urlSenescyt
                        ? "Abrir página SENESCYT"
                        : "Información no disponible"
                    }
                  >
                    Más información
                  </button>
                </div>
              </article>
            ))
          )}
        </section>
      </main>

      <footer className="footer">
        <button className="btn-back" onClick={() => navigate("/chat")}>
          ← Volver al chat
        </button>
      </footer>
    </div>
  );
};

export default Carreras;
