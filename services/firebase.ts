import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAw99hWJTRLcLK3N5jiDkPbL38KUL_fYA4',
  authDomain: 'simplenotes2-be463.firebaseapp.com',
  projectId: 'simplenotes2-be463',
  storageBucket: 'simplenotes2-be463.firebasestorage.app',
  messagingSenderId: '211549192768',
  appId: '1:211549192768:web:f2ea924650966be818d5a5',
  measurementId: 'G-CFYM44VRMT',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
