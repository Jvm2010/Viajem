import app from './firebase.js';
import { 
  getDatabase, ref, push, set, onValue, remove, update, get 
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";
import { 
  getStorage, ref as sRef, uploadBytes, getDownloadURL 
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";

const db = getDatabase(app);
const storage = getStorage(app);
const USER_ID = 'joao123';

function node(path) { 
  return ref(db, `users/${USER_ID}/${path}`); 
}

// Locais
export function subscribePlaces(callback) {
  const r = node('places');
  onValue(r, snap => {
    const places = [];
    if (snap.exists()) {
      const val = snap.val();
      Object.keys(val).forEach(k => {
        places.push({ id: k, ...val[k] });
      });
    }
    places.sort((a, b) => (a.created || 0) - (b.created || 0));
    callback(places);
  });
}

export async function savePlace(place) {
  const r = push(node('places'));
  await set(r, { ...place, created: Date.now() });
  return r.key;
}

export async function removePlace(id) {
  await remove(node(`places/${id}`));
}

// Gastos
export function subscribeExpenses(callback) {
  const r = node('expenses');
  onValue(r, snap => {
    const expenses = [];
    if (snap.exists()) {
      const val = snap.val();
      Object.keys(val).forEach(k => {
        expenses.push({ id: k, ...val[k] });
      });
    }
    expenses.sort((a, b) => (a.created || 0) - (b.created || 0));
    callback(expenses);
  });
}

export async function saveExpense(expense) {
  const r = push(node('expenses'));
  await set(r, { ...expense, created: Date.now() });
  return r.key;
}

// Fotos e Vídeos
export async function uploadImage(file) {
  const path = `users/${USER_ID}/photos/${Date.now()}_${file.name}`;
  const s = sRef(storage, path);
  await uploadBytes(s, file);
  return getDownloadURL(s);
}

export async function getImageUrl(path) {
  const s = sRef(storage, path);
  return getDownloadURL(s);
}

export async function saveVideo(videoData) {
  const r = push(node('videos'));
  await set(r, { ...videoData, created: Date.now() });
  return r.key;
}

// Fotos de locais específicos
export async function addPlacePhoto(placeId, photoUrl) {
  const r = push(node(`places/${placeId}/photos`));
  await set(r, { url: photoUrl, created: Date.now() });
  return r.key;
}

export async function getPlacePhotos(placeId) {
  const snap = await get(node(`places/${placeId}/photos`));
  const photos = [];
  if (snap.exists()) {
    const val = snap.val();
    Object.keys(val).forEach(k => photos.push({ id: k, ...val[k] }));
  }
  return photos.sort((a, b) => (a.created || 0) - (b.created || 0));
}