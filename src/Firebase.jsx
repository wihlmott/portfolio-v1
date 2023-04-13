// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnWUyK4nz_CP7yP6bbeCSZibjMpzqlvYs",
  authDomain: "stardash-v1.firebaseapp.com",
  projectId: "stardash-v1",
  storageBucket: "stardash-v1.appspot.com",
  messagingSenderId: "717237457820",
  appId: "1:717237457820:web:a16c79018b3a8d7a752e59",
  measurementId: "G-ESYC9V5PV7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const analytics = getAnalytics(app);

const db = getFirestore();

export const retrieveAllEducators = async (user) => {
  console.log(`retrieving all educators under ${user}`);

  const collectionRef = collection(db, "all users", user, "educators"); //CHECK THIS **EDITED**

  const educatorNames = [];
  try {
    const snapshots = await getDocs(collectionRef);
    snapshots.docs.forEach((doc) => {
      educatorNames.push(doc.id);
    });

    return educatorNames;
  } catch (err) {
    alert(`could not retrieve all educators -- ${err}`);
  }
};

export const createNewEducator = async (user, educator, number) => {
  console.log(`new educator added. ${educator}`);
  //educator is an object
  const name = `${number} - ${educator.firstname} ${educator.lastname}`;
  try {
    await setDoc(doc(db, "all users", user, "educators", name), {});
  } catch (err) {
    throw err;
  }

  try {
    await setDoc(
      doc(db, "all users", user, "educators", name, "details", "details"),
      {
        firstname: educator.firstname,
        lastname: educator.lastname,
        email: educator.email,
        section: educator.section,
        cell: educator.cell,
      }
    );
  } catch (err) {
    throw err;
  }
};

export const addNewCheckForm = async (
  user,
  educator,
  type,
  dateEntry,
  formState
) => {
  console.log(`adding new ${type} check form`);

  try {
    await setDoc(
      doc(db, "all users", user, "educators", educator, type, dateEntry), // **EDITED**
      {
        details: formState,
      }
    );
  } catch (err) {
    alert(`error adding new ${type} check form -- ${err}`);
  }
};

export const retrieveDocs = async (user, educator, type) => {
  console.log(`retrieving ${type} docs`);

  const collectionRef = collection(
    db,
    "all users",
    user,
    "educators",
    educator,
    type
  ); // **EDITED**

  const entries = [];
  try {
    const snapshots = await getDocs(collectionRef);
    snapshots.docs.forEach((doc) => {
      entries.push({ id: doc.id, details: doc.data().details });
    });

    return entries;
  } catch (err) {
    throw err;
  }
};

export const retrieveEntry = async (user, educator, type, id) => {
  console.log(`retrieving ${type} docs`);

  const docRef = doc(db, "all users", user, "educators", educator, type, id);

  try {
    const doc = await getDoc(docRef);
    return doc.data();
  } catch (err) {
    throw err;
  }
};

// HISTORY METHODS
export const addToHistory = async (user, educator, formType, date) => {
  const dateEntry = date
    .toLocaleString("default", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    .replaceAll(" ", "");

  console.log(`adding ${educator}--${formType}--${dateEntry} to history`);

  try {
    await setDoc(
      doc(db, "all users", user, "history", "history"),
      {
        [`${educator} - ${formType}`]: dateEntry,
      },
      { merge: true }
    );
  } catch (err) {
    throw err;
  }
};

export const retrieveHistory = async (user) => {
  console.log(`retrieving history`);

  try {
    return (
      await getDoc(doc(db, "all users", user, "history", "history"))
    ).data();
  } catch (err) {
    throw err;
  }
};

// AUTH
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const twitterProvider = new TwitterAuthProvider();

export const createNewUser = async (email, password) => {
  console.log(`creating new user`);
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return res.user.email;
  } catch (err) {
    throw err;
  }
};

export const signInUser = async (email, password) => {
  console.log(`signIn with email and password`);
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res.user.email;
  } catch (err) {
    throw err;
  }
};

export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    return res;
  } catch (err) {
    throw err;
  }
};

export const signInWithFacebook = async () => {
  try {
    const res = await signInWithPopup(auth, facebookProvider);
    console.log(res);
    return res;
  } catch (err) {
    alert(`could not sign in with Facebook -- ${err}`);
  }
};

export const signInWithTwitter = async () => {
  try {
    const res = await signInWithPopup(auth, twitterProvider);
    console.log(res);
    return res;
  } catch (err) {
    alert(`could not sign in with Twitter -- ${err}`);
  }
};

export const signOutUser = async () => {
  console.log(`logout user`);

  try {
    await signOut(auth);
    return auth;
  } catch (err) {
    throw err;
  }
};
///////////end of auth

export const retrieveAllUsers = async () => {
  console.log(`retrieving all users`);

  const collectionRef = collection(db, "all users");

  const users = [];
  try {
    const snapshots = await getDocs(collectionRef);
    snapshots.docs.forEach((doc) => {
      users.push(doc.id);
    });

    return users;
  } catch (err) {
    throw err;
  }
};
export const addNewUserToDB = async (email) => {
  console.log(`initial creating of user to db`);

  try {
    await setDoc(doc(db, "all users", email), {});
  } catch (err) {
    throw err;
  }
};

export const retrieveProfileInfo = async (user) => {
  console.log(`retrieving profile information`);

  const docRef = doc(db, "all users", user, "details", "details");
  try {
    const details = (await getDoc(docRef)).data();
    return details;
  } catch (err) {
    throw err;
  }
};
export const setProfileInfo = async (user, info) => {
  console.log(`setting profile details`);

  try {
    await setDoc(doc(db, "all users", user, "details", "details"), {
      firstName: info.firstName,
      lastName: info.lastName,
      email: info.email,
    });
  } catch (err) {
    throw err;
  }
};

export const retrieveEducatorDetails = async (user, educator) => {
  console.log(`retrieving profile information`);

  const docRef = doc(
    db,
    "all users",
    user,
    "educators",
    educator,
    "details",
    "details"
  );
  try {
    const details = (await getDoc(docRef)).data();
    return details;
  } catch (err) {
    throw err;
  }
};

// export const replaceEducatorDetails = async (user, educator) => {
//   const docRef = doc(db, "all users", user, "educators", educator);
//   try {
//     const files = await getDoc(docRef);
//     return files;
//   } catch (err) {
//     throw err;
//   }
// };

export const deleteEducator = async (user, educator) => {
  try {
    await deleteDoc(doc(db, "all users", user, "educators", educator));
  } catch (err) {
    throw err;
  }
};
