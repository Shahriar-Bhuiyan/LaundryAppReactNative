// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBYbm95K1Lou7SF6gPPIk0Wlbawl4t8lk",
  authDomain: "laundry-application-39fdf.firebaseapp.com",
  projectId: "laundry-application-39fdf",
  storageBucket: "laundry-application-39fdf.appspot.com",
  messagingSenderId: "52926193121",
  appId: "1:52926193121:web:6e5ef9b2f46accfa74c6a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore();

export { auth, db };
