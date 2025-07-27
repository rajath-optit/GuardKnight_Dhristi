import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAiM6cONUa65YlHxR3U5w30rqu0lkt0SPM",
  authDomain: "guardknight-dhristi.firebaseapp.com",
  projectId: "guardknight-dhristi",
  storageBucket: "guardknight-dhristi.appspot.com",
  messagingSenderId: "886746573774",
  appId: "1:886746573774:web:be66f6c80733878849999f"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
