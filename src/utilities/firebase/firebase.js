import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

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

// Initialize Firebase Auth and Firestore
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const provider = new GoogleAuthProvider();

// Set custom parameters for the Google Auth provider
provider.setCustomParameters({
  prompt: "select_account",
});

// Function to store user data in Firestore
const createUserDocumentFromAuth = async (userAuth) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email, photoURL } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        photoURL,
        createdAt,
      });
    } catch (error) {
      console.error("Error creating user document:", error);
    }
  }

  return userDocRef;
};

// Export sign-in and sign-out functions
export const signInWithGooglePopup = async () => {
  const result = await signInWithPopup(auth, provider);
  await createUserDocumentFromAuth(result.user);
  return result;
};

export const signOutUser = () => signOut(auth);
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
export { auth, db };
