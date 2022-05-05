import { async } from "@firebase/util";
import { keyboard } from "@testing-library/user-event/dist/keyboard";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
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

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// For firebase database authentication
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
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
      });
    } catch(error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
}