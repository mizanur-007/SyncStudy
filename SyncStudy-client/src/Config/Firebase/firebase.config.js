// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABAAEn0f9bgxaft3x_pHkH08j1ejGj9hg",
  authDomain: "syncstudy-d2433.firebaseapp.com",
  projectId: "syncstudy-d2433",
  storageBucket: "syncstudy-d2433.appspot.com",
  messagingSenderId: "190133464281",
  appId: "1:190133464281:web:0b089c082e89a119be62c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default  auth;