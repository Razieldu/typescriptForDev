
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBNkQlwlRrmRpOuRWNv3wli9AzplQjekUk",
    authDomain: "vuemember.firebaseapp.com",
    projectId: "vuemember",
    storageBucket: "vuemember.appspot.com",
    messagingSenderId: "520951795572",
    appId: "1:520951795572:web:04a64ecaaaf3fbc7de2621"
};

// Initialize Firebase 
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);


// export const addData = async () => {
//     try {
//         const docRef = await addDoc(collection(db, "users"), {
//             first: "Ada",
//             last: "Lovelace",
//             born: 1815
//         });
//         console.log("Document written with ID: ", docRef.id);
//     } catch (e) {
//         console.error("Error adding document: ", e);
//     }
// }

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};


export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);


export const onAuthStateChangedListener = (callback: any) =>
    onAuthStateChanged(auth, callback);