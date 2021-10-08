// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCukzXnPUBXARLloFWK8_72Y4aryTegW1A",
  authDomain: "almond-re.firebaseapp.com",
  databaseURL: "https://almond-re.firebaseio.com",
  projectId: "almond-re",
  storageBucket: "almond-re.appspot.com",
  messagingSenderId: "181012282167",
  appId: "1:181012282167:web:ffea9d24e6328d8eb278b2",
  measurementId: "G-FSPYN0BC07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
