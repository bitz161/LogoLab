import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyB_v8ZabNFWAT12IPPPI_CjL6ZrrZBS0hc',
	authDomain: 'logolab-9f16c.firebaseapp.com',
	projectId: 'logolab-9f16c',
	storageBucket: 'logolab-9f16c.appspot.com',
	messagingSenderId: '412573554975',
	appId: '1:412573554975:web:3e425abccbb844e985782a',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Auth and Firestore
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const provider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp);

// Set custom parameters for the Google Auth provider
provider.setCustomParameters({
	prompt: 'select_account',
});

// Function to store user data in Firestore
const createUserDocumentFromAuth = async userAuth => {
	try {
		if (!userAuth) {
			console.error('No user authentication data provided.');
			return null;
		}

		const userDocRef = doc(db, 'users', userAuth.uid);
		const userSnapshot = await getDoc(userDocRef);

		if (!userSnapshot.exists()) {
			const { displayName, email, photoURL } = userAuth;
			const createdAt = new Date();

			await setDoc(userDocRef, {
				displayName,
				email,
				photoURL,
				createdAt,
				subscription: 'free',
			});
		}

		return userDocRef;
	} catch (error) {
		console.error('Error creating user document:', error);
		return null;
	}
};

// Function to retrieve user information from Firestore by UID
const getUserByUID = async uid => {
	try {
		if (!uid) {
			console.error('No UID provided.');
			return null;
		}

		const userDocRef = doc(db, 'users', uid);
		const userSnapshot = await getDoc(userDocRef);

		if (userSnapshot.exists()) {
			return userSnapshot.data();
		} else {
			console.log('User document does not exist');
			return null;
		}
	} catch (error) {
		console.error('Error fetching user document:', error);
		return null;
	}
};

// Function to upgrade user's subscription to premium
const upgradeSubscriptionToPremium = async uid => {
	try {
		if (!uid) {
			console.error('No UID provided.');
			return;
		}

		const userDocRef = doc(db, 'users', uid);
		await setDoc(userDocRef, { subscription: 'premium' }, { merge: true });

		console.log('Subscription upgraded to premium successfully');
	} catch (error) {
		console.error('Error upgrading subscription to premium:', error);
	}
};

// Export function to upgrade subscription
export const upgradeSubscription = async () => {
	try {
		const user = auth.currentUser;
		if (user) {
			await upgradeSubscriptionToPremium(user.uid);
		} else {
			console.error('No user is currently signed in.');
		}
	} catch (error) {
		console.error('Error upgrading subscription:', error);
	}
};

// Export sign-in and sign-out functions
export const signInWithGooglePopup = async () => {
	try {
		const result = await signInWithPopup(auth, provider);
		await createUserDocumentFromAuth(result.user);
		return result;
	} catch (error) {
		console.error('Error signing in with Google:', error);
		throw error;
	}
};

export const uploadImageToFirebase = async (imageFile, path, currentDate) => {
	console.log('uploadImageToFirebase called with path:', path);
	try {
		if (!imageFile) {
			console.error('No image file provided.');
			return null;
		}

		const storage = getStorage();
		const storageRef = ref(storage, path);

		console.log('Uploading file...');
		const snapshot = await uploadBytes(storageRef, imageFile);
		console.log('Upload completed:', snapshot);

		console.log('Getting download URL...');
		const downloadURL = await getDownloadURL(snapshot.ref);
		console.log('Download URL:', downloadURL);

		await createImageInfo(imageFile.size, currentDate, downloadURL);

		return downloadURL;
	} catch (error) {
		console.error('Error in uploadImageToFirebase:', error);
		throw error;
	}
};

export const createImageInfo = async (imgSize, currentDate, imgUrl) => {
	try {
		const user = auth.currentUser;
		if (!user) {
			console.error('No user authentication data provided.');
			return null;
		}

		const imgDocRef = doc(db, 'uploads', user.uid);
		const imgSnapshot = await getDoc(imgDocRef);

		if (!imgSnapshot.exists()) {
			const { displayName, email, uid } = user;
			const createdAt = new Date();

			await setDoc(imgDocRef, {
				creatorID: uid,
				creatorName: displayName,
				creatorEmail: email,
				fileName: `${currentDate}.png`,
				fileUrl: imgUrl,
				uploadTimestamp: new Date().toISOString(),
				fileType: 'image/png',
				fileSize: imgSize,
				price: null,
				status: 'not published',
				description: '',
			});
		}
	} catch (error) {
		console.log(`Error creating image data: ${error}`);
	}
};

export const signOutUser = () => signOut(auth);

export const onAuthStateChangedListener = callback => onAuthStateChanged(auth, callback);

export { auth, db, getUserByUID };
