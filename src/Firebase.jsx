// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import { collection, doc, getDoc, getDocs, getFirestore, setDoc } from 'firebase/firestore';
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
  measurementId: "G-ESYC9V5PV7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const analytics = getAnalytics(app);

const db = getFirestore();

export const retrieveAllEducators = async (user) => {
  console.log(`retrieving all educators under ${user}`)

  const collectionRef = collection(db, user)

  const educatorNames = []
  try {
    const snapshots = await getDocs(collectionRef);
    snapshots.docs.forEach((doc)=>{educatorNames.push(doc.id)});

    return educatorNames;
  } catch (err) {
    alert(`could not retrieve all educators -- ${err}`)    
  }
}

export const createNewEducator = async (user,educator) => {
  console.log(`new educator added. ${educator}`)
  //educator is an object
  const name = `${educator.firstname} ${educator.lastname}`;
  try {
    await setDoc(doc(db, user, name),{})
  } catch (err) {
    alert(`error setting doc -- ${err}`)
  }

  try {
    await setDoc(doc(db, user, name, 'details','details'), {
      firstname: educator.firstname,
      lastname: educator.lastname,
      email: educator.email,
      section: educator.section,
      cell: educator.cell
    })    
  } catch (err) {
    alert(`error setting details -- ${err}`);    
  }
}

export const addNewCheckForm = async (user, educator, type, date, formState) => {
  console.log(`adding new ${type} check form`);

  const dateEntry = date.toLocaleString('default', {day: 'numeric', month:'short', year:'numeric'}).replaceAll(' ','');
  try {
    await setDoc(doc(db, user, educator, type, dateEntry), {
      details: formState
    })
  } catch (err) {
    alert(`error adding new ${type} check form -- ${err}`);    
  }
}

export const retrieveDocs = async (user, educator, type) => {
  console.log(`retrieving ${type} docs`)
  
  const collectionRef = collection(db, user, educator, type);
  
  const entries = [];
  try {
        const snapshots = await getDocs(collectionRef);
        snapshots.docs.forEach((doc)=>{entries.push({id: doc.id, details: doc.data().details})});

        return entries;
  } catch (err) {
    alert(`could not retrieve ${type} docs -- ${err}`);    
  };
}

export const addToHistory = async (user, educator, formType, date) => {
  const dateEntry = date.toLocaleString('default', {day: 'numeric', month:'short', year:'numeric'}).replaceAll(' ','');

  console.log(`adding ${educator}--${formType}--${dateEntry} to history`);

  try {
    await setDoc(doc(db, user, 'history'),{
      [`${educator}--${formType}`]: dateEntry,
    },{merge: true})
  } catch (err) {
    alert(`could not uppdate history in db -- ${err}`)
  }
}

export const retriveHistory = async (user) => {
  console.log(`retrieving history`);

  // const history = [];
  try {
    return (await getDoc(doc(db, user, 'history'))).data();
  } catch (err) {
    alert(`could not retrieve history -- ${err}`);    
  } 
}

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const twitterProvider = new TwitterAuthProvider();

export const createNewUser = async (email, password) => {

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    console.log(res);
    return res;
  } catch (err) {
    alert(`could not create new user -- ${err.code}-${err.message}`);
  }
}

export const signInUser = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    console.log(res);
    return res;
  } catch (err) {
    alert(`could not sign in user -- ${err.code}-${err.message}`);    
  }
}

export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    console.log(res);    
    return res;
  } catch (err) {
    alert(`could not sign in with Google -- ${err}`);
  }
}

export const signInWithFacebook = async () => {
  try {
    const res = await signInWithPopup(auth, facebookProvider);
    console.log(res);    
    return res;
  } catch (err) {
    alert(`could not sign in with Facebook -- ${err}`);
  }
}

export const signInWithTwitter = async () => {
  try {
    const res = await signInWithPopup(auth, twitterProvider);
    console.log(res);    
    return res;
  } catch (err) {
    alert(`could not sign in with Twitter -- ${err}`);
  }
}