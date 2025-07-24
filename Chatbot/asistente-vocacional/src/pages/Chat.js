import React, { useState, useEffect, useRef } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import "../styles/chat.css";

//borrar

// adsd

import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import personaje from "../assets/personaje.png";
import { useNavigate } from "react-router-dom";

const socket = new WebSocket("ws://localhost:8090");
const preguntas = [
  "¿Cuál es tu área de interés principal? (Ej: Ciencias, Arte, Tecnología, etc.)",
  "¿Prefieres trabajar con personas, datos o máquinas?",
  "¿Qué actividades disfrutas más en tu tiempo libre?",
  "¿Te gustaría trabajar en equipo o prefieres tareas individuales?",
];

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [preguntaIndex, setPreguntaIndex] = useState(-1);
  const [historyList, setHistoryList] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const messagesEndRef = useRef(null);
  const messageHandlerRef = useRef(null);
  const navigate = useNavigate();

  // Guarda respuestas parciales y finales
  async function guardarRespuesta(userId, pregunta, respuesta) {
    if (!userId) return;
    try {
      await addDoc(collection(db, "users", userId, "respuestasChat"), {
        pregunta,
        respuesta,
        fecha: serverTimestamp(),
      });
    } catch (e) {
      console.error("Guardar respuesta:", e);
    }
  }

  // Guarda todo el chat como historial
  const nuevoChat = async () => {
    if (!user || messages.length === 0) return;
    try {
      await addDoc(collection(db, "users", user.uid, "historialChats"), {
        mensajes: messages,
        fecha: serverTimestamp(),
      });
      setMessages([]);
      setShowHistory(false);
      setPreguntaIndex(0);
    } catch (e) {
      console.error("Guardar historial:", e);
    }
  };

  // Carga historial de chats previos
  const verHistorial = async () => {
    if (!user) return;
    const q = query(
      collection(db, "users", user.uid, "historialChats"),
      orderBy("fecha", "desc")
    );
    const snap = await getDocs(q);
    const list = snap.docs.map((d) => ({
      id: d.id,
      fecha: d.data().fecha.toDate().toLocaleString(),
      mensajes: d.data().mensajes,
    }));
    setHistoryList(list);
    setShowHistory(true);
  };

  // Carga un chat histórico
  const handleVerChat = (chat) => {
    setMessages(chat.mensajes);
    setShowHistory(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const nombre =
          firebaseUser.displayName || firebaseUser.email.split("@")[0];
        setUser({
          displayName: nombre,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
          uid: firebaseUser.uid,
        });
        setPreguntaIndex(0);
        agregarMensaje({
          content: `¡Hola ${nombre}! Bienvenido al asistente vocacional.`,
          role: "assistant",
          id: uuidv4(),
        });
      } else {
        setUser(null);
        setMessages([]);
        setPreguntaIndex(-1);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const agregarMensaje = (msg) => setMessages((prev) => [...prev, msg]);

  useEffect(() => {
    if (preguntaIndex >= 0 && preguntaIndex < preguntas.length) {
      agregarMensaje({
        content: preguntas[preguntaIndex],
        role: "assistant",
        id: uuidv4(),
      });
    } else if (preguntaIndex === preguntas.length) {
      agregarMensaje({
        content:
          "Gracias por tus respuestas. Ahora voy a ayudarte a elegir la carrera adecuada...",
        role: "assistant",
        id: uuidv4(),
      });
      setPreguntaIndex(-1);
    }
  }, [preguntaIndex]);

  const handleSubmit = (text) => {
    if (isLoading) return;

    if (preguntaIndex !== -1) {
      if (!question.trim()) return;
      agregarMensaje({ content: question, role: "user", id: uuidv4() });
      guardarRespuesta(user.uid, preguntas[preguntaIndex], question);
      setQuestion("");
      setPreguntaIndex(preguntaIndex + 1);
      return;
    }

    if (!socket || socket.readyState !== WebSocket.OPEN) return;
    const messageText = text || question;
    setIsLoading(true);
    cleanupMessageHandler();

    const traceId = uuidv4();
    setMessages((prev) => [...prev, { content: messageText, role: "user", id: traceId }]);
    socket.send(messageText);
    setQuestion("");

    let respuestaCompleta = "";
    const messageHandler = (event) => {
      if (event.data.includes("[END]")) {
        setIsLoading(false);
        cleanupMessageHandler();
        if (user) guardarRespuesta(user.uid, messageText, respuestaCompleta);
        return;
      }
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        const isAssistant = last.role === "assistant";
        const newContent = isAssistant ? last.content + event.data : event.data;
        const newMsg = {
          content: newContent,
          role: "assistant",
          id: traceId,
        };
        respuestaCompleta += event.data;
        return isAssistant ? [...prev.slice(0, -1), newMsg] : [...prev, newMsg];
      });
    };

    messageHandlerRef.current = messageHandler;
    socket.addEventListener("message", messageHandler);
  };

  const cleanupMessageHandler = () => {
    if (messageHandlerRef.current && socket) {
      socket.removeEventListener("message", messageHandlerRef.current);
      messageHandlerRef.current = null;
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setMessages([]);
    setPreguntaIndex(-1);
  };

  return (
    <div className="container-fluid vh-100 dark-theme">
      <div className="row h-100">
        <div className="col-9 d-flex flex-column border-end p-0 chat-section">
          <div className="header p-3 d-flex justify-content-between align-items-center">
            <h5 className="m-0">Asistente Vocacional</h5>
            {user && (
              <button
                className="btn btn-outline-light d-flex align-items-center gap-2"
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
            {showHistory ? (
              <div className="history-list">
                <h6>Historial de Chats</h6>
                {historyList.map((h) => (
                  <div
                    key={h.id}
                    className="history-item"
                    onClick={() => handleVerChat(h)}
                    style={{ cursor: "pointer", padding: "5px", borderBottom: "1px solid #444" }}
                  >
                    {h.fecha}
                  </div>
                ))}
              </div>
            ) : (
              messages.map((msg, i) => (
                <div
                  key={i}
                  className={`d-flex mb-2 ${
                    msg.role === "user" ? "justify-content-end" : "justify-content-start"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <img
                      src={personaje}
                      alt="Asistente"
                      className="chat-avatar me-2"
                    />
                  )}
                  <div
                    className={`p-2 rounded message-bubble ${
                      msg.role === "user" ? "user-message" : "assistant-message"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="text-muted small mt-2">Escribiendo...</div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {!showHistory && (
            <div className="border-top p-3 d-flex gap-2 chat-input">
              <input
                type="text"
                className="form-control bg-dark text-white border-secondary"
                placeholder={
                  preguntaIndex !== -1
                    ? "Escribe tu respuesta..."
                    : "Escribe tu mensaje..."
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
          )}
        </div>

        <div className="col-3 d-flex flex-column position-relative p-4 options-panel">
          <h5>Opciones</h5>
          <ul className="list-group mt-3">
            <li
              className="list-group-item list-group-item-dark"
              onClick={nuevoChat}
              style={{ cursor: "pointer" }}
            >
              Nuevo chat
            </li>
            <li
              className="list-group-item list-group-item-dark"
              onClick={verHistorial}
              style={{ cursor: "pointer" }}
            >
              Ver historial de chats
            </li>
            <li
              className="list-group-item list-group-item-dark"
              onClick={() => navigate("/carreras")}
              style={{ cursor: "pointer" }}
            >
              Ver carreras
            </li>
            <li
  className="list-group-item list-group-item-dark"
  onClick={() => window.location.href = "http://localhost:3000/universidades"}
  style={{ cursor: "pointer" }}
>
  Universidades
</li>


          </ul>

          {showProfile && user && (
            <div
              className="position-absolute bg-dark border rounded p-3 shadow text-white"
              style={{ bottom: 70, right: 20, width: 250, zIndex: 1000 }}
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
                  <strong>{user.displayName}</strong>
                  <br />
                  <small>{user.email}</small>
                </div>
              </div>
             <button 
                className="btn btn-sm btn-outline-danger w-100"
                onClick={() => {
                window.location.href = "http://localhost:3000/";
              }}
            >
              Cerrar sesión
            </button>

            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}
