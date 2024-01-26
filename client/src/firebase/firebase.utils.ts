
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signInWithRedirect, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, serverTimestamp, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { transformTime } from "@/utils";

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

const githubProvider = new GithubAuthProvider()

export const auth = getAuth();

export const signInWithGooglePopup = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        let user = result?.user
        await createUserDocumentFromAuth(user)
    } catch (error) {
        console.log(error)
    }
}


export const signInWithGoogleRedirect = () =>
    signInWithRedirect(auth, googleProvider);

export const signInWithGithubPopup = () => signInWithPopup(auth, githubProvider)



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


////fireStore

export const db = getFirestore(firebaseApp);

export const createUserDocumentFromAuth = async (userAuth: any) => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    if (!userSnapshot.exists()) {
        const { displayName, email, uid, photoURL, providerData, emailVerified, phoneNumber } = userAuth
        let userData = {
            displayName,
            emailVerified,
            email,
            phoneNumber,
            photoURL,
            uid,
            providerData,
            timestamp: serverTimestamp()
        }
        try {
            await setDoc(userDocRef, userData);
        } catch (error) {
            console.log('error creating the user', error);
        }
    }
    return userSnapshot
};

export const updateUserPhoto = async (uid: string, photoNewURL: string) => {
    try {
        const userRef = doc(db, "users", uid);
        await updateDoc(userRef, { photoURL: photoNewURL })
    } catch (error) {
        console.error(error)
    }
}

export const getUserPhoto = async (uid: string) => {
    let photoURL = ""
    try {
        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef)
        if (userSnap.exists()) {
            photoURL = userSnap.data().photoURL
        }
    } catch (error) {
        console.log("No such document!");
    }
    return photoURL
}


////fireStorage
export const storage = getStorage();

export const uploadImageToStorage = async (file: any, uid: string) => {
    try {
        let time = new Date();
        const result = transformTime(time);
        const mountainImagesRef = ref(storage, `userPhoto/${uid}/${result}`);

        await new Promise((resolve, reject) => {
            uploadBytes(mountainImagesRef, file).then((snapshot: any) => {
                console.log('Uploaded a blob or file!', snapshot);
                resolve(result);  // 在 uploadBytes 完成後，將 result 傳遞給 resolve
            }).catch(reject);  // 如果有錯誤，將錯誤傳遞給 reject
        });

        return result;  // 在 Promise 完成後再返回 result
    } catch (error) {
        console.error(error);
    }
}


export const getPhoto = async (uid: string, photoName: string) => {
    let resultURL = "";
    try {
        const url = await getDownloadURL(ref(storage, `userPhoto/${uid}/${photoName}`));
        resultURL = url;
    } catch (error) {
        console.error(error);
    }
    return resultURL;
};