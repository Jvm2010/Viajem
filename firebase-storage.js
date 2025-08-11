import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { 
  getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject 
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

const firebaseConfig = {
  apiKey: "AIzaSyCo85R9Kx5jEj-nJmfxdLHLMkbUaaxnwGg",
  authDomain: "viajem-31a90.firebaseapp.com",
  projectId: "viajem-31a90",
  storageBucket: "viajem-31a90.appspot.com",
  messagingSenderId: "697715655288",
  appId: "1:697715655288:web:a09f4932ca82849de7e38d"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);

function getUserId() {
  return auth.currentUser?.uid || 'anonymous_' + Math.random().toString(36).substring(2, 9);
}

export async function uploadPhoto(file, onProgress) {
  const userId = getUserId();
  return new Promise((resolve, reject) => {
    try {
      const storageRef = ref(storage, `users/${userId}/photos/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (typeof onProgress === 'function') {
            onProgress(progress);
          }
        },
        (error) => {
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            
            const photoData = {
              id: uploadTask.snapshot.ref.name,
              url: downloadURL,
              name: file.name,
              size: file.size,
              type: file.type,
              uploadedAt: Date.now()
            };
            
            resolve(photoData);
          } catch (error) {
            reject(error);
          }
        }
      );
    } catch (error) {
      reject(error);
    }
  });
}

export async function deletePhoto(photoId) {
  const userId = getUserId();
  try {
    const photoRef = ref(storage, `users/${userId}/photos/${photoId}`);
    await deleteObject(photoRef);
  } catch (error) {
    console.error("Erro ao deletar foto:", error);
    throw error;
  }
}

export async function getPhotoUrl(photoId) {
  const userId = getUserId();
  try {
    const photoRef = ref(storage, `users/${userId}/photos/${photoId}`);
    return await getDownloadURL(photoRef);
  } catch (error) {
    console.error("Erro ao obter URL da foto:", error);
    throw error;
  }
}
