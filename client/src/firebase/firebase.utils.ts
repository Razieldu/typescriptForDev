
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_APIKEY,
    authDomain: import.meta.env.VITE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_PROJECTID,
    storageBucket: import.meta.env.VITE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGINGSENDID,
    appId: import.meta.env.VITE_APPID
}

// Initialize Firebase 
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
  
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore(firebaseApp);

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

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                console.log(unsubscribe);
                unsubscribe();
                resolve(userAuth);
            },
            reject
        );
    });
};



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
