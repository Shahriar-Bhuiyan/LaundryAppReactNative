import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth,initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: "AIzaSyBBYbm95K1Lou7SF6gPPIk0Wlbawl4t8lk",
  authDomain: "laundry-application-39fdf.firebaseapp.com",
  projectId: "laundry-application-39fdf",
  storageBucket: "laundry-application-39fdf.appspot.com",
  messagingSenderId: "52926193121",
  appId: "1:52926193121:web:6e5ef9b2f46accfa74c6a0"
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence( AsyncStorage),
});
export const db = getFirestore(app);


