import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { 
  getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject 
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js';

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
const userId = 'joao123'; // Em produção, usar auth.currentUser.uid

// Upload com monitoramento de progresso
export async function uploadPhoto(file, onProgress) {
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
            resolve({
              url: downloadURL,
              id: uploadTask.snapshot.ref.name
            });
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

// Obter todas as fotos
export async function getPhotos() {
  // Nota: Em produção, você precisaria manter um índice no Realtime Database
  // Esta é uma versão simplificada
  return Promise.resolve([]);
}

// Deletar foto
export async function deletePhoto(photoId) {
  try {
    const photoRef = ref(storage, `users/${userId}/photos/${photoId}`);
    await deleteObject(photoRef);
  } catch (error) {
    console.error("Erro ao deletar foto:", error);
    throw error;
  }
}