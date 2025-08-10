// firebase.js - inicialização do Firebase (fornecido pelo usuário)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCo85R9Kx5jEj-nJmfxdLHLMkbUaaxnwGg",
  authDomain: "viajem-31a90.firebaseapp.com",
  databaseURL: "https://viajem-31a90-default-rtdb.firebaseio.com",
  projectId: "viajem-31a90",
  storageBucket: "viajem-31a90.firebasestorage.app",
  messagingSenderId: "697715655288",
  appId: "1:697715655288:web:a09f4932ca82849de7e38d"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const storage = getStorage(app);
export default app;
