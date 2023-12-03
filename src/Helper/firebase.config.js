// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzqL_rJS4VfHbJ6gw3eO-L7K0nnHMl830",
  authDomain: "ell-aggon.firebaseapp.com",
  projectId: "ell-aggon",
  storageBucket: "ell-aggon.appspot.com",
  messagingSenderId: "589859626195",
  appId: "1:589859626195:web:63708f513458cf4bda8826",
  measurementId: "G-3QH8F9ZX70"
};

// Initialize Firebase
export const appFirebase = initializeApp(firebaseConfig);
export const analytics = getAnalytics(appFirebase);
export const auth = getAuth(appFirebase);