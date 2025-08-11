import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { 
  getDatabase, ref, set, push, onValue, remove 
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

const firebaseConfig = {
  apiKey: "AIzaSyCo85R9Kx5jEj-nJmfxdLHLMkbUaaxnwGg",
  authDomain: "viajem-31a90.firebaseapp.com",
  databaseURL: "https://viajem-31a90-default-rtdb.firebaseio.com",
  projectId: "viajem-31a90",
  storageBucket: "viajem-31a90.appspot.com",
  messagingSenderId: "697715655288",
  appId: "1:697715655288:web:a09f4932ca82849de7e38d"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const userId = 'joao123'; // Em produção, usar auth.currentUser.uid

// Operações CRUD para locais
export async function getPlaces() {
  return new Promise((resolve, reject) => {
    try {
      const placesRef = ref(db, `users/${userId}/places`);
      onValue(placesRef, (snapshot) => {
        const data = snapshot.val() || {};
        const places = Object.entries(data).map(([id, place]) => ({
          id, ...place
        }));
        resolve(places);
      }, { onlyOnce: true });
    } catch (error) {
      reject(error);
    }
  });
}

export async function savePlace(place) {
  try {
    const newPlaceRef = push(ref(db, `users/${userId}/places`));
    await set(newPlaceRef, place);
    return newPlaceRef.key;
  } catch (error) {
    console.error("Erro ao salvar local:", error);
    throw error;
  }
}

export async function deletePlace(id) {
  try {
    await remove(ref(db, `users/${userId}/places/${id}`));
  } catch (error) {
    console.error("Erro ao remover local:", error);
    throw error;
  }
}