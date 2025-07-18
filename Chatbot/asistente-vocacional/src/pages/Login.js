import React, { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Image from "../assets/osolejos.jpg";
import Logo from "../assets/logos.jpg";
import GoogleSvg from "../assets/icons8-google.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import "../styles/Login.css";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [resetMode, setResetMode] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/chat");
    } catch (error) {
      setMessage("⚠️ " + error.message);
    }
  };

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage(" Revisa tu correo para restablecer tu contraseña.");
    } catch (error) {
      setMessage("⚠️ " + error.message);
    }
  };

  const handleGoogleLogin = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
    navigate("/chat"); // redirecciona al chat después del login
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
            <h2>
                         ¡Asistente vocacional!

            </h2>
            <p>Ingresa tus datos para continuar</p>

            {message && <p className="login-message">{message}</p>}

            <form onSubmit={resetMode ? undefined : handleLogin}>
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              {!resetMode && (
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
              )}

              <div className="login-center-options">
                {!resetMode && (
                  <div className="remember-div">
                   
                    
                  </div>
                )}
                <button
                  type="button"
                  className="forgot-pass-link"
                  onClick={() => {
                    if (resetMode) {
                      setResetMode(false);
                      setMessage("");
                    } else {
                      setResetMode(true);
                      setMessage("");
                    }
                  }}
                >
                  {resetMode ? "← Volver al login" : "¿Olvidaste tu contraseña?"}
                </button>
              </div>

              <div className="login-center-buttons">
                {resetMode ? (
                  <button type="button" onClick={handlePasswordReset}>
                    Enviar enlace de recuperación
                  </button>
                ) : (
                  <button type="submit">Iniciar sesión</button>
                )}

                <button type="button" className="google-login" onClick={handleGoogleLogin}>
  <img src={GoogleSvg} alt="Google" />
  Iniciar sesión con Google
</button>
              </div>
            </form>
          </div>

          {!resetMode && (
            <p className="login-bottom-p">
              ¿No tienes una cuenta? <a href="/register">Regístrate aquí</a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
