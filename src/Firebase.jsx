// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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
const analytics = getAnalytics(app);

const db = getFirestore();

export const retrieveAllEducators = async (user) => {
  console.log(`retrieving all educators under ${user}`)

  const collectionRef = collection(db, user)

  const educatorNames = []
  try {
    const snapshots = await getDocs(collectionRef)
    snapshots.docs.forEach((doc)=>{educatorNames.push(doc.id)})

    return educatorNames;
  } catch (err) {
    alert(`could not retrieve all educators -- ${err}`)    
  }
}

export const createNewEducator = async (user,educator) => {
  console.log(`new educator added. ${educator}`)

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