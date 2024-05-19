// firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiGds-EpCkg8UN_D7enAacz4y_aoGFHbk",
  authDomain: "logolab-92529.firebaseapp.com",
  projectId: "logolab-92529",
  storageBucket: "logolab-92529.appspot.com",
  messagingSenderId: "1068429743853",
  appId: "1:1068429743853:web:d4b132d290eef33ae65ee4",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Auth and set up Google provider
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

// Set custom parameters for the Google Auth provider
provider.setCustomParameters({
  prompt: "select_account",
});

// Export sign-in and sign-out functions
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signOutUser = () => signOut(auth);
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
export { auth };
