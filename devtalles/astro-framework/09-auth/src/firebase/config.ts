// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const apiKey = import.meta.env.API_KEY

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: `${import.meta.env.API_KEY}`,
  authDomain: `${import.meta.env.AUTH_DOMAIN}`,
  projectId:`${import.meta.env.PROJECT_ID}`,
  storageBucket: `${import.meta.env.STOREAGE_BUCKET}`,
  messagingSenderId: `${import.meta.env.MESSAGING_SENDER_ID}`,
  appId: `${import.meta.env.APP_ID}`
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

auth.languageCode = 'es'; // esto fuerza a que la authentication esté en español mientras que si no lo pones, coge la que tiene por default el navegador 

export const firebase = {
  app, 
  auth
}