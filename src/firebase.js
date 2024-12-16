// src/firebase.js

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'; // Import Firebase Authentication

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyDN-Fgz3bxlVdCn8tvchOvD0ortGJjbO10",
  authDomain: "pawpal-bdb63.firebaseapp.com",
  projectId: "pawpal-bdb63",
  storageBucket: "pawpal-bdb63.firebasestorage.app",
  messagingSenderId: "283385631787",
  appId: "1:283385631787:web:b726796d7128a7ad72066e",
  measurementId: "G-90C1S58S58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Firestore instance
const storage = getStorage(app); // Storage instance
const auth = getAuth(app); // Authentication instance
const analytics = getAnalytics(app);
export { db, storage, auth ,collection, addDoc, getDocs, updateDoc, doc }; // Export all instances
