
// db_api.js - simple wrapper for Firebase Realtime Database and Storage
import app from './firebase.js';
import { getDatabase, ref, push, set, onValue, remove, update, get, child } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";
import { getStorage, ref as sRef, uploadString, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";

const db = getDatabase(app);
const storage = getStorage(app);

// fixed user id as per login
const USER_ID = 'joao123';

function node(path){ return ref(db, `users/${USER_ID}/${path}`); }

export function subscribePlaces(cb){
  const r = node('locais');
  onValue(r, snap => {
    const out = [];
    if(snap.exists()){
      const val = snap.val();
      Object.keys(val).forEach(k => {
        out.push(Object.assign({ id: k }, val[k]));
      });
    }
    // sort by created time if present
    out.sort((a,b)=> (a.created||0) - (b.created||0));
    cb(out);
  });
}

export async function savePlace(place){
  const r = push(node('locais'));
  const data = Object.assign({}, place, { created: Date.now() });
  await set(r, data);
  return r.key;
}

export async function updatePlace(id, data){
  await update(node(`locais/${id}`), data);
}

export async function removePlace(id){
  await remove(node(`locais/${id}`));
}

export function subscribeGeneral(cb){
  const r = node('gastos');
  onValue(r, snap => {
    const out = [];
    if(snap.exists()){
      const val = snap.val();
      Object.keys(val).forEach(k => out.push(Object.assign({ id:k }, val[k])) );
    }
    out.sort((a,b)=> (a.created||0) - (b.created||0));
    cb(out);
  });
}

export async function saveGeneral(g){
  const r = push(node('gastos'));
  const data = Object.assign({}, g, { created: Date.now() });
  await set(r, data);
  return r.key;
}

export async function removeGeneral(id){
  await remove(node(`gastos/${id}`));
}

// Photos

export async function uploadImageDataURL(dataUrl, storagePath){
  // storagePath example: 'users/joao123/locais/<id>/photos/name.jpg'
  const s = sRef(storage, storagePath);
  // dataUrl expected like data:image/jpeg;base64,...
  await uploadString(s, dataUrl, 'data_url');
  const url = await getDownloadURL(s);
  return url;
}

export async function addPhotoToPlace(placeId, url){
  const r = push(node(`locais/${placeId}/photos`));
  await set(r, { url, created: Date.now() });
  return r.key;
}

export async function saveGlobalPhoto(url){
  const r = push(node('photos'));
  await set(r, { url, created: Date.now() });
  return r.key;
}

export async function listPhotosForPlace(placeId){
  const snap = await get(node(`locais/${placeId}/photos`));
  const out = [];
  if(snap.exists()){
    const val = snap.val();
    Object.keys(val).forEach(k=> out.push(Object.assign({id:k}, val[k])));
    out.sort((a,b)=> (a.created||0) - (b.created||0));
  }
  return out;
}
