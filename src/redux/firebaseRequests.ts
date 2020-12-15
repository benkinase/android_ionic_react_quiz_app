import firebase from "firebase/app";
import "firebase/auth";
import { toast } from "../toast";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

firebase.initializeApp(config);

// get current user
export async function getCurrentUser() {
  try {
    return new Promise((resolve, reject) => {
      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          resolve(user);
        } else {
          resolve(null);
        }
        unsubscribe();
      });
    });
  } catch (error) {
    toast(error.message, "danger");
    return false;
  }
}

// login
export async function loginUser(email: string, password: string) {
  try {
    const res = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    return res;
  } catch (error) {
    toast(error.message, "danger");
    return false;
  }
}
// sign up new user
export async function registerUser(email: string, password: string) {
  try {
    const res = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    return res;
  } catch (error) {
    toast(error.message, "danger");
    return false;
  }
}
// log out user
export async function logoutUser() {
  try {
    return firebase.auth().signOut();
  } catch (error) {
    toast(error.message, "danger");
  }
}
