import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/analytics'

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCbohHldibFPn_sBYSPDa8AxN0_lvV0stc",
    authDomain: "plantiful-ec98d.firebaseapp.com",
    databaseURL: "https://plantiful-ec98d-default-rtdb.firebaseio.com",
    projectId: "plantiful-ec98d",
    storageBucket: "plantiful-ec98d.appspot.com",
    messagingSenderId: "997098059961",
    appId: "1:997098059961:web:5f9e4aa32b0053551e4368",
    measurementId: "G-V0MZCSJB64"
  };
  // Initialize Firebase
  export default function firebaseClient() {
      if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
  }
  //firebase.analytics();

//   const projectStorage = firebase.storage();

//   export {projectStorage};