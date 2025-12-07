// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDEOfLjjEBG5Mo3c4pb7dXWURe1lBrRNYE",
  authDomain: "appbasket-e2ee2.firebaseapp.com",
  databaseURL: "https://appbasket-e2ee2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "appbasket-e2ee2",
  storageBucket: "appbasket-e2ee2.firebasestorage.app",
  messagingSenderId: "379389441288",
  appId: "1:379389441288:web:f4b7e18847ce4013ece8bd"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportamos la BD para usarla en toda la app
export const db = getDatabase(app);
