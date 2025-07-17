import React, { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Image from "../assets/osologin.jpg";
import Logo from "../assets/logos.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import "../styles/Register.css";

const provinciasEcuador = [
  "Azuay", "Bolívar", "Cañar", "Carchi", "Chimborazo", "Cotopaxi", "El Oro", "Esmeraldas",
  "Galápagos", "Guayas", "Imbabura", "Loja", "Los Ríos", "Manabí", "Morona Santiago", "Napo",
  "Orellana", "Pastaza", "Pichincha", "Santa Elena", "Santo Domingo de los Tsáchilas", "Sucumbíos",
  "Tungurahua", "Zamora Chinchipe"
];

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [provincia, setProvincia] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        nombre,
        apellido,
        provincia,
        createdAt: new Date(),
      });

      navigate("/chat");
    } catch (error) {
      setMessage("⚠️ " + error.message);
    }
  };

  return (
    <div className="login-main">
      <div className="login-left">
        <img src={Image} alt="Fondo" />
      </div>

      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            <img src={Logo} alt="Logo" />
          </div>

          <div className="login-center">
            <h2>Crear cuenta</h2>
            <p>Regístrate para comenzar</p>

            {message && <p className="login-message">{message}</p>}

            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="Apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                required
              />

             <select
  className="custom-select"
  value={provincia}
  onChange={(e) => setProvincia(e.target.value)}
  required
>
  <option value="" disabled>
    Selecciona tu provincia
    
  </option>
  {provinciasEcuador.map((prov) => (
    <option key={prov} value={prov}>
      {prov}
    </option>
  ))}
</select>


              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {showPassword ? (
                  <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <FaEye onClick={() => setShowPassword(!showPassword)} />
                )}
              </div>

              <div className="login-center-buttons">
                <button type="button" onClick={handleRegister}>
                  Registrarse
                </button>
              </div>
            </form>
          </div>

          <p className="login-bottom-p">
            ¿Ya tienes una cuenta? <a href="/">Inicia sesión</a>
          </p>
        </div>
      </div>
    </div>
  );
}
