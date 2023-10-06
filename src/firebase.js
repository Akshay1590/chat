import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyAJzvdEFs_DO8CQDFPEgVbHOONqVFoWCms",
  authDomain: "chat-vite-4af8d.firebaseapp.com",
  projectId: "chat-vite-4af8d",
  storageBucket: "chat-vite-4af8d.appspot.com",
  messagingSenderId: "314313459683",
  appId: "1:314313459683:web:a1eb3d979b40e10bbf82d6",
  measurementId: "G-6MCBBWV0FG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);
export { auth, db, storage };