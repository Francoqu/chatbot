import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/universidades.css";

import universidades from "../components/listaUniversidades";



// Configurar iconos Leaflet por defecto
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// Componente para mover el mapa al seleccionar universidad
const MapaMover = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], 14);
    }
  }, [lat, lng, map]);
  return null;
};



const Universidades = () => {
  const navigate = useNavigate();
  const [selectedUniversidad, setSelectedUniversidad] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleVolver = () => {
    navigate("/chat");
  };

  // Filtrar universidades por nombre según searchTerm
  const universidadesFiltradas = universidades.filter((u) =>
    u.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="universidades-layout">
      <div className="mapa-section">
        <h2 className="map-title">Universidades del Ecuador</h2>
        <div className="map-box">
          <MapContainer
            center={[-1.5, -78]}
            zoom={6.2}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {universidadesFiltradas.map((u, i) => (
              <Marker
                key={i}
                position={[u.lat, u.lng]}
                eventHandlers={{
                  click: () => {
                    setSelectedUniversidad(u);
                  },
                }}
              >
                <Popup>{u.nombre}</Popup>
              </Marker>
            ))}

            {selectedUniversidad && (
              <MapaMover lat={selectedUniversidad.lat} lng={selectedUniversidad.lng} />
            )}
          </MapContainer>
        </div>
      </div>

      <div className="info-container">
        {selectedUniversidad ? (
          <div>
            <h2>{selectedUniversidad.nombre}</h2>
            <p><strong>Ciudad:</strong> {selectedUniversidad.ciudad}</p>
            <p><strong>Tipo:</strong> {selectedUniversidad.tipo}</p>
            <p><strong>Descripción:</strong> {selectedUniversidad.descripcion}</p>
            <p><strong>Año de fundación:</strong> {selectedUniversidad.fundacion || "No disponible"}</p>
            <p><strong>Estudiantes:</strong> {selectedUniversidad.estudiantes ? selectedUniversidad.estudiantes.toLocaleString() : "No disponible"}</p>
            {selectedUniversidad.principalesCarreras && selectedUniversidad.principalesCarreras.length > 0 && (
              <p><strong>Principales carreras:</strong> {selectedUniversidad.principalesCarreras.join(", ")}</p>
            )}
            {selectedUniversidad.sitioWeb && (
              <p>
                <strong>Sitio web:</strong>{" "}
                <a href={selectedUniversidad.sitioWeb} target="_blank" rel="noopener noreferrer">
                  {selectedUniversidad.sitioWeb}
                </a>
              </p>
            )}
          </div>
        ) : (
          <>
            <h2>Universidades del Ecuador</h2>
            <input
              type="text"
              placeholder=" Buscar universidad..."
              className="buscar-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <p>Selecciona una universidad en el mapa para ver más detalles.</p>
            <ul>
              {universidadesFiltradas.map((u, i) => (
                <li key={i} className="universidad-item">
                  {u.nombre}
                  {selectedUniversidad && selectedUniversidad.nombre === u.nombre && (
                    <div className="detalle-listado">
                      <p><strong>Ciudad:</strong> {u.ciudad}</p>
                      <p><strong>Tipo:</strong> {u.tipo}</p>
                      <p><strong>Descripción:</strong> {u.descripcion}</p>
                      <p><strong>Año de fundación:</strong> {u.fundacion || "No disponible"}</p>
                      <p><strong>Estudiantes:</strong> {u.estudiantes ? u.estudiantes.toLocaleString() : "No disponible"}</p>
                      {u.principalesCarreras && u.principalesCarreras.length > 0 && (
                        <p><strong>Principales carreras:</strong> {u.principalesCarreras.join(", ")}</p>
                      )}
                      {u.sitioWeb && (
                        <p><strong>Sitio web:</strong> <a href={u.sitioWeb} target="_blank" rel="noopener noreferrer">{u.sitioWeb}</a></p>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <button className="btn-volver-fixed" onClick={handleVolver}>
        ← Volver al Chat
      </button>
    </div>
  );
};

export default Universidades;
