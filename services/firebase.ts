import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCS_3GLi5mUQqqDJ-5pk0wUs1VPDhPoMSM',
  authDomain: 'simplenotes-1e95f.firebaseapp.com',
  projectId: 'simplenotes-1e95f',
  storageBucket: 'simplenotes-1e95f.firebasestorage.app',
  messagingSenderId: '415288091871',
  appId: '1:415288091871:web:29510dcd78cdbe9b42756a',
  measurementId: 'G-PNFN4VW52F',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
