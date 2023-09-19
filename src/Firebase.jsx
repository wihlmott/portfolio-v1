// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
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

export const retrieveAllEducators = async (admin, supervisor) => {
  console.log(`retrieving all educators under ${supervisor}`);

  const collectionRef = collection(
    db,
    "admins",
    admin,
    "supervisors",
    supervisor,
    "educators"
  ); //CHECK THIS **EDITED**

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

export const createNewEducator = async (
  admin,
  supervisor,
  educator,
  number
) => {
  console.log(`new educator added. ${educator}`);
  //educator is an object
  const name = `${number} - ${educator.firstname} ${educator.lastname}`;
  try {
    await setDoc(
      doc(db, "admins", admin, "supervisors", supervisor, "educators", name),
      {}
    );
  } catch (err) {
    throw err;
  }

  try {
    await setDoc(
      doc(
        db,
        "admins",
        admin,
        "supervisors",
        supervisor,
        "educators",
        name,
        "details",
        "details"
      ),
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
  admin,
  supervisor,
  educator,
  type,
  dateEntry,
  formState
) => {
  console.log(`adding new ${type} check form`);
  const timeStamp = new Date().getTime();
  try {
    await setDoc(
      doc(
        db,
        "admins",
        admin,
        "supervisors",
        supervisor,
        "educators",
        educator,
        type,
        dateEntry
      ), // **EDITED**
      {
        details: formState,
        time: timeStamp,
      }
    );
  } catch (err) {
    alert(`error adding new ${type} check form -- ${err}`);
  }
};

export const retrieveDocs = async (admin, supervisor, educator, type) => {
  console.log(`retrieving ${type} docs`);

  const collectionRef = collection(
    db,
    "admins",
    admin,
    "supervisors",
    supervisor,
    "educators",
    educator,
    type
  ); // **EDITED**

  const entries = [];
  try {
    const snapshots = await getDocs(collectionRef);
    snapshots.docs.forEach((doc) => {
      entries.push({
        id: doc.id,
        details: doc.data().details,
        time: doc.data().time,
      });
    });

    return entries;
  } catch (err) {
    throw err;
  }
};

export const retrieveEntry = async (admin, supervisor, educator, type, id) => {
  console.log(`retrieving ${type} docs`);

  const docRef = doc(
    db,
    "admins",
    admin,
    "supervisors",
    supervisor,
    "educators",
    educator,
    type,
    id
  );
  try {
    const doc = await getDoc(docRef);
    return doc.data();
  } catch (err) {
    throw err;
  }
};

// HISTORY METHODS
export const addToHistory = async (
  admin,
  supervisor,
  educator,
  formType,
  date
) => {
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
      doc(
        db,
        "admins",
        admin,
        "supervisors",
        supervisor,
        "information",
        "history"
      ),
      {
        [`${educator} - ${formType}`]: dateEntry,
      },
      { merge: true }
    );
  } catch (err) {
    throw err;
  }
};

export const retrieveHistory = async (admin, supervisor) => {
  console.log(`retrieving history`);

  try {
    return (
      await getDoc(
        doc(
          db,
          "admins",
          admin,
          "supervisor",
          supervisor,
          "information",
          "history"
        )
      )
    ).data();
  } catch (err) {
    throw err;
  }
};

// AUTH
const googleProvider = new GoogleAuthProvider();

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

export const addAdmin = async (admin) => {
  console.log(`adding ${admin} to admin`);
  try {
    await setDoc(doc(db, "admins", admin), {});
  } catch (err) {
    throw err;
  }
};
export const retrieveAllAdmins = async () => {
  console.log(`retrieving admins`);

  const collectionRef = collection(db, "admins");
  const admins = [];
  try {
    const snapshots = await getDocs(collectionRef);
    snapshots.docs.forEach((doc) => {
      admins.push(doc.id);
    });
    return admins;
  } catch (err) {
    throw err;
  }
};
export const retrieveAllUsers = async (admin) => {
  console.log(`retrieving supervisors`);

  const collectionRef = collection(db, "admins", admin, "supervisors");

  const supervisor = [];
  try {
    const snapshots = await getDocs(collectionRef);
    snapshots.docs.forEach((doc) => {
      supervisor.push(doc.id);
    });

    return supervisor;
  } catch (err) {
    throw err;
  }
};
export const addNewUserToDB = async (admin, supervisor) => {
  console.log(`initial creating of user to db`);
  try {
    await setDoc(doc(db, "admins", admin, "supervisors", supervisor), {});
  } catch (err) {
    throw err;
  }
};

export const retrieveProfileInfo = async (admin, supervisor) => {
  console.log(`retrieving profile information`);

  const docRef = doc(
    db,
    "admins",
    admin,
    "supervisors",
    supervisor,
    "information",
    "details"
  );
  try {
    const details = (await getDoc(docRef)).data();
    return details;
  } catch (err) {
    throw err;
  }
};
export const setProfileInfo = async (admin, supervisor, info) => {
  console.log(`setting profile details`);

  try {
    await setDoc(
      doc(
        db,
        "admins",
        admin,
        "supervisors",
        supervisor,
        "information",
        "details"
      ),
      {
        firstName: info.firstName,
        lastName: info.lastName,
        email: info.email,
      }
    );
  } catch (err) {
    throw err;
  }
};

export const retrieveEducatorDetails = async (admin, supervisor, educator) => {
  console.log(`retrieving profile information`);

  const docRef = doc(
    db,
    "admins",
    admin,
    "supervisors",
    supervisor,
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

export const deleteEducator = async (admin, supervisor, educator) => {
  try {
    await deleteDoc(
      doc(db, "admins", admin, "supervisors", supervisor, "educators", educator)
    );
  } catch (err) {
    throw err;
  }
};

export const setPreferences = async (admin, supervisor, preferences) => {
  console.log(`setting profile preferences`);

  try {
    await setDoc(
      doc(
        db,
        "admins",
        admin,
        "supervisors",
        supervisor,
        "information",
        "preferences"
      ),
      {
        cardView: preferences.cardView,
      },
      { merge: true }
    );
  } catch (err) {
    throw err;
  }
};

export const retrievePreferences = async (admin, supervisor) => {
  console.log(`retrieving preferences`);

  try {
    return (
      await getDoc(
        doc(
          db,
          "admins",
          admin,
          "supervisors",
          supervisor,
          "information",
          "preferences"
        )
      )
    ).data();
  } catch (err) {
    throw err;
  }
};

//hardcoded for now, fix later
export const retrieveVerificationCode = async (admin, supervisor) => {
  console.log(`retrieving admin verificationCode`);

  try {
    return (
      await getDoc(
        doc(
          db,
          "admin",
          admin,
          "supervisors",
          supervisor,
          "information",
          "details"
        )
      )
    ).data().verificationCode;
  } catch (err) {
    throw err;
  }
};
