// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0Ht8rDACrQy3fgBYzSzHAky0WoBBupyk",
  authDomain: "flight-project-1ac26.firebaseapp.com",
  projectId: "flight-project-1ac26",
  storageBucket: "flight-project-1ac26.appspot.com",
  messagingSenderId: "128419646588",
  appId: "1:128419646588:web:922d11f996fe53f2184df9",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
