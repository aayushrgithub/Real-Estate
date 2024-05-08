// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "realestate-d3158.firebaseapp.com",
    projectId: "realestate-d3158",
    storageBucket: "realestate-d3158.appspot.com",
    messagingSenderId: "870017036023",
    appId: "1:870017036023:web:f5e49423ad02df11502df2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);