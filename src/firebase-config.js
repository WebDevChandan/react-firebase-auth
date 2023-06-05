import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCB77B8UZYULFpz8QJ-bmpEYNm_UFxLHac",
    authDomain: "react-auth-e790d.firebaseapp.com",
    projectId: "react-auth-e790d",
    storageBucket: "react-auth-e790d.appspot.com",
    messagingSenderId: "855749273963",
    appId: "1:855749273963:web:1467e84440388fc529042e",
    measurementId: "G-WKRGSZF73P"
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);