// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtqNDdpxV0ePXGzVxyiaWN-eYDED8TJQk",
  authDomain: "wulloyeauth.firebaseapp.com",
  projectId: "wulloyeauth",
  storageBucket: "wulloyeauth.appspot.com",
  messagingSenderId: "571709004057",
  appId: "1:571709004057:web:2d5069179ebd0714524d88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();