// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3bSYYkTKuCeXRZ3_Omu0sY-fadZ-OC24",
  authDomain: "mondrian-ecommerce.firebaseapp.com",
  projectId: "mondrian-ecommerce",
  storageBucket: "mondrian-ecommerce.appspot.com",
  messagingSenderId: "681924726633",
  appId: "1:681924726633:web:4669b75c0c73b2d036f7f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const initFirestore = () => app;