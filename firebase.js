import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { 
  getDatabase, ref, set, push, onValue, remove, update 
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

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
const auth = getAuth(app);

// Helper para obter o userId
function getUserId() {
  return auth.currentUser?.uid || 'anonymous_' + Math.random().toString(36).substring(2, 9);
}

// ========== Métodos para Locais ==========
export async function savePlace(place) {
  const userId = getUserId();
  try {
    const newPlaceRef = push(ref(db, `users/${userId}/places`));
    await set(newPlaceRef, {
      ...place,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
    return newPlaceRef.key;
  } catch (error) {
    console.error("Erro ao salvar local:", error);
    throw error;
  }
}

export async function updatePlace(id, updates) {
  const userId = getUserId();
  try {
    await update(ref(db, `users/${userId}/places/${id}`), {
      ...updates,
      updatedAt: Date.now()
    });
  } catch (error) {
    console.error("Erro ao atualizar local:", error);
    throw error;
  }
}

export async function deletePlace(id) {
  const userId = getUserId();
  try {
    await remove(ref(db, `users/${userId}/places/${id}`));
  } catch (error) {
    console.error("Erro ao remover local:", error);
    throw error;
  }
}

export function listenToPlaces(callback) {
  const userId = getUserId();
  const placesRef = ref(db, `users/${userId}/places`);
  
  const unsubscribe = onValue(placesRef, (snapshot) => {
    const data = snapshot.val() || {};
    const places = Object.entries(data).map(([id, place]) => ({
      id,
      ...place
    }));
    callback(places);
  });
  
  return unsubscribe;
}

// ========== Métodos para Fotos ==========
export async function savePhotoMetadata(photoData) {
  const userId = getUserId();
  try {
    await set(ref(db, `users/${userId}/photos/${photoData.id}`), photoData);
  } catch (error) {
    console.error("Erro ao salvar metadados da foto:", error);
    throw error;
  }
}

export async function deletePhotoMetadata(photoId) {
  const userId = getUserId();
  try {
    await remove(ref(db, `users/${userId}/photos/${photoId}`));
  } catch (error) {
    console.error("Erro ao remover metadados da foto:", error);
    throw error;
  }
}

export function listenToPhotos(callback) {
  const userId = getUserId();
  const photosRef = ref(db, `users/${userId}/photos`);
  
  const unsubscribe = onValue(photosRef, (snapshot) => {
    const data = snapshot.val() || {};
    const photos = Object.entries(data).map(([id, photo]) => ({
      id,
      ...photo
    }));
    callback(photos);
  });
  
  return unsubscribe;
}
