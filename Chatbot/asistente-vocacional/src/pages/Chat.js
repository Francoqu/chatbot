import React, { useState, useEffect, useRef } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../firebase"; // Asegúrate de importar db también
import { v4 as uuidv4 } from "uuid";
import "../styles/chat.css"; // Importamos el CSS para estilos personalizados
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const socket = new WebSocket("ws://localhost:8090");

const preguntas = [
  "¿Cuál es tu área de interés principal? (Ej: Ciencias, Arte, Tecnología, etc.)",
  "¿Prefieres trabajar con personas, datos, o máquinas?",
  "¿Qué actividades disfrutas más en tu tiempo libre?",
  "¿Te gustaría trabajar en equipo o prefieres tareas individuales?",
];

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [preguntaIndex, setPreguntaIndex] = useState(-1); // -1 = saludo antes de empezar preguntas
  const messagesEndRef = useRef(null);
  const messageHandlerRef = useRef(null);

  // Función para guardar en Firestore la pregunta y respuesta
  async function guardarRespuesta(userId, pregunta, respuesta) {
    if (!userId) return;
    try {
      await addDoc(collection(db, "users", userId, "respuestasChat"), {
        pregunta,
        respuesta,
        fecha: serverTimestamp(),
      });
      console.log("Respuesta guardada correctamente.");
    } catch (error) {
      console.error("Error guardando respuesta:", error);
    }
  }

  // Manejo de autenticación y saludo + comienzo de preguntas
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const nombreUsuario = firebaseUser.displayName || firebaseUser.email.split("@")[0];
        setUser({
          displayName: nombreUsuario,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
          uid: firebaseUser.uid,
        });

        setPreguntaIndex(0); // Inicia con la primera pregunta

        // Saludo inicial
        agregarMensaje({
          content: `¡Hola ${nombreUsuario}! Bienvenido al asistente vocacional.`,
          role: "assistant",
          id: uuidv4(),
        });
      } else {
        setUser(null);
        setPreguntaIndex(-1);
        setMessages([]);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const agregarMensaje = (msg) => {
    setMessages((prev) => [...prev, msg]);
  };

  // Mostrar la pregunta actual cuando cambia el índice
  useEffect(() => {
    if (preguntaIndex >= 0 && preguntaIndex < preguntas.length) {
      agregarMensaje({
        content: preguntas[preguntaIndex],
        role: "assistant",
        id: uuidv4(),
      });
    } else if (preguntaIndex === preguntas.length) {
      // Fin de preguntas, mensaje de transición a ChatGPT
      agregarMensaje({
        content:
          "Gracias por tus respuestas. Ahora voy a ayudarte a elegir la carrera adecuada...",
        role: "assistant",
        id: uuidv4(),
      });
      setPreguntaIndex(-1); // Bloquear input para esta demo
    }
  }, [preguntaIndex]);

  // Función que antes era handleSubmit, ahora controla si estamos en cuestionario o en chat real
  const handleSubmit = (text) => {
    if (isLoading) return;
    if (preguntaIndex !== -1) {
      // Estamos en modo preguntas iniciales

      if (!question.trim()) return;

      agregarMensaje({
        content: question,
        role: "user",
        id: uuidv4(),
      });

      setQuestion("");
      setPreguntaIndex(preguntaIndex + 1);
      return;
    }

    // Si preguntaIndex = -1, ya pasó la etapa de preguntas, usar socket normalmente:
    if (!socket || socket.readyState !== WebSocket.OPEN) return;

    const messageText = text || question;
    setIsLoading(true);
    cleanupMessageHandler();

    const traceId = uuidv4();
    setMessages((prev) => [...prev, { content: messageText, role: "user", id: traceId }]);
    socket.send(messageText);
    setQuestion("");

    try {
      let respuestaCompleta = "";

      const messageHandler = (event) => {
        if (event.data.includes("[END]")) {
          setIsLoading(false);
          cleanupMessageHandler();

          // Guardar la pregunta y respuesta completa en Firestore
          if (user) {
            guardarRespuesta(user.uid, messageText, respuestaCompleta);
          }
          return;
        }

        setMessages((prev) => {
          const last = prev[prev.length - 1];
          const isAssistant = last?.role === "assistant";
          const newContent = isAssistant ? last.content + event.data : event.data;
          const newMsg = { content: newContent, role: "assistant", id: traceId };

          // Acumular la respuesta que llega en fragmentos
          respuestaCompleta += event.data;

          return isAssistant ? [...prev.slice(0, -1), newMsg] : [...prev, newMsg];
        });
      };

      messageHandlerRef.current = messageHandler;
      socket.addEventListener("message", messageHandler);
    } catch (err) {
      console.error("WebSocket error:", err);
      setIsLoading(false);
    }
  };

  const cleanupMessageHandler = () => {
    if (messageHandlerRef.current && socket) {
      socket.removeEventListener("message", messageHandlerRef.current);
      messageHandlerRef.current = null;
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setShowProfile(false);
    setUser(null);
    setMessages([]);
    setPreguntaIndex(-1);
  };

  return (
    <div className="container-fluid vh-100 dark-theme">
      <div className="row h-100">
        {/* Chat - 80% */}
        <div className="col-9 d-flex flex-column border-end p-0 chat-section">
          <div className="header p-3 d-flex justify-content-between align-items-center">
            <h5 className="m-0">Asistente Vocacional</h5>
            {user && (
              <button
                className="btn btn-outline-light d-flex align-items-center gap-2"
                style={{ borderRadius: "50px", padding: "0.25rem 0.75rem" }}
                onClick={() => setShowProfile(!showProfile)}
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Perfil"
                    style={{ width: 32, height: 32, borderRadius: "50%" }}
                  />
                ) : (
                  <span>{user.email}</span>
                )}
              </button>
            )}
          </div>

          <div className="flex-grow-1 overflow-auto p-3 chat-body">
            {messages.length === 0 && (
              <div className="text-center text-muted mt-5">
                Escribe una pregunta para comenzar
              </div>
            )}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`d-flex mb-2 ${
                  msg.role === "user" ? "justify-content-end" : "justify-content-start"
                }`}
              >
                <div
                  className={`p-2 rounded message-bubble ${
                    msg.role === "user" ? "user-message" : "assistant-message"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-muted small mt-2">Escribiendo respuesta...</div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-top p-3 d-flex gap-2 chat-input">
            <input
              type="text"
              className="form-control bg-dark text-white border-secondary"
              placeholder={
                preguntaIndex !== -1 ? "Escribe tu respuesta..." : "Escribe tu mensaje..."
              }
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              disabled={preguntaIndex === -1 && isLoading}
            />
            <button
              className="btn btn-primary"
              onClick={() => handleSubmit()}
              disabled={preguntaIndex === -1 && isLoading}
            >
              Enviar
            </button>
          </div>
        </div>

        {/* Opciones - 20% */}
        <div className="col-3 d-flex flex-column position-relative p-4 options-panel">
          <h5>Opciones</h5>
          <ul className="list-group mt-3">
            <li className="list-group-item list-group-item-dark">Ver historial</li>
            <li className="list-group-item list-group-item-dark">Ajustes de perfil</li>
            <li className="list-group-item list-group-item-dark">Cambiar tema</li>
          </ul>

          {showProfile && user && (
            <div
              className="position-absolute bg-dark border rounded p-3 shadow text-white"
              style={{ width: 250, bottom: 70, right: 20, zIndex: 1000 }}
            >
              <div className="d-flex align-items-center gap-3 mb-3">
                {user.photoURL && (
                  <img
                    src={user.photoURL}
                    alt="Perfil"
                    style={{ width: 48, height: 48, borderRadius: "50%" }}
                  />
                )}
                <div>
                  <strong>{user.displayName || "Usuario"}</strong>
                  <br />
                  <small className="text-light">{user.email}</small>
                </div>
              </div>
              <button
                className="btn btn-sm btn-outline-danger w-100"
                onClick={() => {
                  handleLogout();
                  setShowProfile(false);
                }}
              >
                Cerrar sesión
              </button>
            </div>
          )}

          <div className="position-absolute bottom-0 end-0 m-3 d-flex gap-2">
            <button
              className="btn btn-outline-secondary"
              onClick={() => setShowProfile(!showProfile)}
            >
              Perfil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
