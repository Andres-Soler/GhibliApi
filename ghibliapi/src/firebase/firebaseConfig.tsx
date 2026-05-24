import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAVZpuiWmgab3ROiVQWML0Fhio6LAmK6wg",
  authDomain: "ghibligod-7efca.firebaseapp.com",
  projectId: "ghibligod-7efca",
  storageBucket: "ghibligod-7efca.firebasestorage.app",
  messagingSenderId: "948212448397",
  appId: "1:948212448397:web:d1597e9fbd89cd083236c4"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar Auth para usarlo en toda la app
export const auth = getAuth(app);