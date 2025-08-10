// firebase.js - minimal Firebase Realtime Database helpers (ES module)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getDatabase, ref, set, onValue, push, child, get } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

const firebaseConfig = {
  "apiKey": "AIzaSyAhgI-chsUNwg6zi54slG7vdvwYiSMtw4M",
  "authDomain": "projeto-cdkoch.firebaseapp.com",
  "databaseURL": "https://projeto-cdkoch-default-rtdb.firebaseio.com",
  "projectId": "projeto-cdkoch",
  "storageBucket": "projeto-cdkoch.firebasestorage.app",
  "messagingSenderId": "452171639169",
  "appId": "1:452171639169:web:bdda9fb75f1bff50616080"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Simple user id (anonymous, persisted locally) - replace with real auth later
export function getUserId() {
  let id = localStorage.getItem('viagem_user_id');
  if(!id) { id = 'u_' + Math.random().toString(36).slice(2,10); localStorage.setItem('viagem_user_id', id); }
  return id;
}

export function dbSaveUserData(userId, payload) {
  try { set(ref(db, 'usuarios/' + userId), payload); } catch(e){ console.error(e); }
}

export function dbOnUserData(callback) {
  const id = getUserId();
  onValue(ref(db, 'usuarios/' + id), (snap) => { callback(snap.val()); });
}

// photos helpers - stored under usuarios/{id}/photos as pushed nodes
export async function dbSaveUserPhoto(dataUrl) {
  const id = getUserId();
  const photosRef = ref(db, 'usuarios/' + id + '/photos');
  const p = push(photosRef);
  await set(p, { data: dataUrl, createdAt: Date.now() });
  return p.key;
}

export async function dbListUserPhotos() {
  const id = getUserId();
  const snap = await get(ref(db, 'usuarios/' + id + '/photos'));
  const out = [];
  if(snap.exists()) { const val = snap.val(); Object.keys(val).reverse().forEach(k=>out.push({ id:k, data: val[k].data })); }
  return out;
}
