// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmv11ufIAFqJqTz6ojVjLKNbMhVspll9k",
  authDomain: "astro-authentication-d4cdb.firebaseapp.com",
  projectId: "astro-authentication-d4cdb",
  storageBucket: "astro-authentication-d4cdb.appspot.com",
  messagingSenderId: "617102496520",
  appId: "1:617102496520:web:9849c304ed5a0885e7d2bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

auth.languageCode = 'es'; // esto fuerza a que la authentication esté en español mientras que si no lo pones, coge la que tiene por default el navegador 

export const firebase = {
  app, 
  auth
}