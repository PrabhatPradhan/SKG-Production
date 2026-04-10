// lib/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAdLpC3Q0aMfsBcqGHVe_BB5CQ3SL7Hk04",
  authDomain: "prabhat-login-22830.firebaseapp.com",
  projectId: "prabhat-login-22830",
  storageBucket: "prabhat-login-22830.firebasestorage.app",
  messagingSenderId: "894880468841",
  appId: "1:894880468841:web:ba654642e08176030d37f8",
  measurementId: "G-RP78LPL3E8"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);