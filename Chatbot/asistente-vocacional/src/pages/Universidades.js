// src/pages/Universidades.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/universidades.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// Datos de universidades (puedes expandir con más info si quieres)
const universidades = [
  {
    nombre: "Universidad Central del Ecuador",
    lat: -0.2115,
    lng: -78.4915,
    ciudad: "Quito",
    tipo: "Pública",
    descripcion: "Es la universidad más antigua del país y una de las más grandes, con una oferta académica variada en múltiples áreas del conocimiento.",
  },
  {
    nombre: "Universidad Técnica Particular de Loja (UTPL)",
    lat: -3.9939,
    lng: -79.2044,
    ciudad: "Loja",
    tipo: "Privada",
    descripcion: "Institución líder en educación a distancia en Ecuador, reconocida por su enfoque en innovación tecnológica y formación humanista.",
  },
  {
    nombre: "ESPOL (Escuela Superior Politécnica del Litoral)",
    lat: -2.1474,
    lng: -79.9270,
    ciudad: "Guayaquil",
    tipo: "Pública",
    descripcion: "Institución de prestigio especializada en ciencia, tecnología, ingeniería y matemáticas, con gran enfoque en investigación.",
  },
  {
    nombre: "Universidad de las Américas (UDLA)",
    lat: -0.1683,
    lng: -78.4743,
    ciudad: "Quito",
    tipo: "Privada",
    descripcion: "Universidad moderna con una fuerte presencia en comunicación, medicina, negocios y arquitectura.",
  },
  {
    nombre: "Universidad San Francisco de Quito (USFQ)",
    lat: -0.1620,
    lng: -78.4935,
    ciudad: "Quito (Cumbayá)",
    tipo: "Privada",
    descripcion: "Universidad liberal con fuerte énfasis en artes, ciencias sociales y biológicas, reconocida por su campus y enfoque internacional.",
  },
  {
    nombre: "Universidad Técnica de Ambato (UTA)",
    lat: -1.2510,
    lng: -78.6164,
    ciudad: "Ambato",
    tipo: "Pública",
    descripcion: "Institución regional con una sólida oferta en ingenierías, ciencias económicas y educación.",
  },
  {
    nombre: "Escuela Politécnica Nacional (EPN)",
    lat: -0.1869,
    lng: -78.4874,
    ciudad: "Quito",
    tipo: "Pública",
    descripcion: "Reconocida por su exigencia académica, especialmente en ingeniería y ciencias aplicadas.",
  },
  {
    nombre: "Pontificia Universidad Católica del Ecuador (PUCE)",
    lat: -0.1975,
    lng: -78.4916,
    ciudad: "Quito",
    tipo: "Privada",
    descripcion: "Una de las universidades más tradicionales del país, con enfoque humanista y católico, y gran variedad de carreras.",
  },
  {
    nombre: "Universidad de Cuenca",
    lat: -2.9005,
    lng: -79.0043,
    ciudad: "Cuenca",
    tipo: "Pública",
    descripcion: "Principal universidad de la región austral del país, destacada en áreas como arquitectura, salud y ciencias sociales.",
  },
  {
    nombre: "Universidad Técnica del Norte (UTN)",
    lat: 0.3439,
    lng: -78.1223,
    ciudad: "Ibarra",
    tipo: "Pública",
    descripcion: "Universidad clave del norte del país, con fuerte presencia en agroindustria, educación y tecnología.",
  },
  {
    nombre: "Universidad Estatal de Milagro (UNEMI)",
    lat: -2.1555,
    lng: -79.6136,
    ciudad: "Milagro",
    tipo: "Pública",
    descripcion: "Institución emergente con enfoque en educación superior inclusiva y desarrollo local.",
  },
  {
    nombre: "Universidad Católica de Santiago de Guayaquil",
    lat: -2.1950,
    lng: -79.8885,
    ciudad: "Guayaquil",
    tipo: "Privada",
    descripcion: "Universidad con enfoque cristiano-católico, destacada en carreras como derecho, medicina y psicología.",
  },
  {
    nombre: "Universidad Politécnica Salesiana (UPS) - Quito",
    lat: -0.1742,
    lng: -78.4881,
    ciudad: "Quito",
    tipo: "Privada",
    descripcion: "Institución salesiana con fuerte compromiso social y educativo en las áreas técnicas, sociales y humanísticas.",
  },
  {
    nombre: "Universidad del Azuay",
    lat: -2.9001,
    lng: -78.9997,
    ciudad: "Cuenca",
    tipo: "Privada",
    descripcion: "Universidad reconocida por su calidad académica en ingeniería, derecho y diseño.",
  },
  {
    nombre: "Universidad Técnica Estatal de Quevedo",
    lat: -1.0314,
    lng: -79.4655,
    ciudad: "Quevedo",
    tipo: "Pública",
    descripcion: "Importante institución en la región costera, especializada en agronomía, agroindustria y administración.",
  },
  {
    nombre: "Universidad Nacional de Loja (UNL)",
    lat: -3.9994,
    lng: -79.2040,
    ciudad: "Loja",
    tipo: "Pública",
    descripcion: "Una de las universidades más antiguas del sur del país, con fuerte enfoque en áreas sociales, jurídicas, económicas y de la salud.",
  },
  {
    nombre: "Instituto Superior Tecnológico Daniel Álvarez Burneo",
    lat: -4.0023,
    lng: -79.2065,
    ciudad: "Loja",
    tipo: "Público",
    descripcion: "Instituto de educación superior técnico-tecnológica que ofrece carreras prácticas orientadas al mercado laboral.",
  },
  {
    nombre: "Instituto Superior Tecnológico Sudamericano",
    lat: -3.9952,
    lng: -79.1998,
    ciudad: "Loja",
    tipo: "Privado",
    descripcion: "Institución técnica privada con programas modernos en administración, tecnología y comunicación.",
  }
];



const Universidades = () => {
  const navigate = useNavigate();
  const [selectedUniversidad, setSelectedUniversidad] = useState(null);

  const handleVolver = () => {
    navigate("/chat");
  };

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
            {universidades.map((u, i) => (
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
          </div>
        ) : (
          <>
            <h2>Universidades del Ecuador</h2>
            <p>Selecciona una universidad en el mapa para ver más detalles.</p>
            <ul>
              {universidades.map((u, i) => (
                <li key={i} className="universidad-item">
                  {u.nombre}
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
