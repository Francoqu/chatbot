// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// Configuración de tu proyecto Firebase (copiada de tu consola)
const firebaseConfig = {
  apiKey: "AIzaSyA232Qv8Tp4ZKR5AxEx7PC6-mHmgVh8Tk0",
  authDomain: "chatbot-f02ad.firebaseapp.com",
  projectId: "chatbot-f02ad",
  storageBucket: "chatbot-f02ad.appspot.com", // 🔧 CORREGIDO (tenías .app en lugar de .app**spot**.com)
  messagingSenderId: "725715164325",
  appId: "1:725715164325:web:0f659ce29864ebda79814c",
  measurementId: "G-89TQRRCKQC"
};


async function guardarRespuesta(userId, pregunta, respuesta) {
  if (!userId) return;
  try {
    const docRef = await addDoc(collection(db, "users", userId, "respuestasChat"), {
      pregunta,
      respuesta,
      fecha: serverTimestamp(),
    });
    console.log("Respuesta guardada con ID:", docRef.id);
  } catch (error) {
    console.error("Error guardando respuesta:", error);
  }
}




// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// ⚠️ Solo usar Analytics si estás en navegador y no en Node.js
const analytics = getAnalytics(app);

// ✅ Exportar auth y firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
