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
  apiKey: "AIzaSyB_v8ZabNFWAT12IPPPI_CjL6ZrrZBS0hc",
  authDomain: "logolab-9f16c.firebaseapp.com",
  projectId: "logolab-9f16c",
  storageBucket: "logolab-9f16c.appspot.com",
  messagingSenderId: "412573554975",
  appId: "1:412573554975:web:3e425abccbb844e985782a",
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
        subscription: "free",
      });
    } catch (error) {
      console.error("Error creating user document:", error);
    }
  }

  return userDocRef;
};

// Function to retrieve user information from Firestore by UID
const getUserByUID = async (uid) => {
  try {
    // Construct a reference to the user document using the UID
    const userDocRef = doc(db, "users", uid);

    // Retrieve the user document snapshot
    const userSnapshot = await getDoc(userDocRef);

    // Check if the document exists
    if (userSnapshot.exists()) {
      // Access the user data from the snapshot
      const userData = userSnapshot.data();
      return userData;
    } else {
      // Handle case where user document does not exist
      console.log("User document does not exist");
      return null;
    }
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error fetching user document:", error);
    return null;
  }
};

// Function to upgrade user's subscription to premium
const upgradeSubscriptionToPremium = async (uid) => {
  try {
    // Construct a reference to the user document using the UID
    const userDocRef = doc(db, "users", uid);

    // Update the subscription field to "premium"
    await setDoc(userDocRef, { subscription: "premium" }, { merge: true });

    console.log("Subscription upgraded to premium successfully");
  } catch (error) {
    console.error("Error upgrading subscription to premium:", error);
  }
};

// Export function to upgrade subscription
export const upgradeSubscription = async () => {
  const user = auth.currentUser;
  if (user) {
    await upgradeSubscriptionToPremium(user.uid);
  } else {
    console.error("No user is currently signed in.");
  }
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
export { auth, db, getUserByUID };
