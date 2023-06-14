// import firebase from 'fi
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAH2QBURsU_PMYF5lHd9Zq7dpoNqBLp9FA",
  authDomain: "weiter-786e3.firebaseapp.com",
  projectId: "weiter-786e3",
  storageBucket: "weiter-786e3.appspot.com",
  messagingSenderId: "960575133813",
  appId: "1:960575133813:web:33670dea2d2843dadc003c",
  measurementId: "G-ZZ2WL0XBGE"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseDB = getDatabase(firebaseApp)
export const firebaseAuth = getAuth(firebaseApp)
export const firestoreDB = getFirestore(firebaseApp)