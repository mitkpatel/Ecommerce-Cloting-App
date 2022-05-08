import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc 
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmTeAUb4l13_tsDTO4aEbE5F0vDlmKiBg",
  authDomain: "ecommerce-mitpatel.firebaseapp.com",
  projectId: "ecommerce-mitpatel",
  storageBucket: "ecommerce-mitpatel.appspot.com",
  messagingSenderId: "150728967961",
  appId: "1:150728967961:web:40a7d3ceb85440b1b5e788",
};

// Initialize Firebase
const firebasApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

// For firebase database authentication
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapShot = await getDoc(userDocRef)

  // if user data doesn't exist in database
  if(!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    } catch(error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
}

export const signInAuthUserWithEmailAndPassword = async (email,password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password)
}


export const createAuthUserWithEmailAndPassword = async (email,password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth);