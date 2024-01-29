
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signInWithRedirect, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, serverTimestamp, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { transformTime } from "@/utils";
import { useUserDataStore } from "@/store";
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
            googlePhotoURL: photoURL,
            userChoosePhotoURL: "",
            currentPhotoName: "",
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

export const updateUserPhotoDoc = async (uid: string, photoNewURL: string, photoName: string) => {
    try {
        const userRef = doc(db, "users", uid);
        await updateDoc(userRef, { userChoosePhotoURL: photoNewURL, currentPhotoName: photoName })
    } catch (error) {
        console.error(error)
    }
}

export const getUserPhotoDoc = async (uid: string) => {
    let photoURL = ""
    try {
        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef)
        if (userSnap.exists()) {
            let googlePhoto = userSnap.data().googlePhotoURL
            let userChoosePhoto = userSnap.data().userChoosePhotoURL
            photoURL = userChoosePhoto || googlePhoto
        }
    } catch (error) {
        console.log("No such document!");
    }
    console.log(photoURL)
    return photoURL
}


////fireStorage
export const storage = getStorage();

export const uploadImageToStorage = async (file: any, uid: string) => {
    const { setUserChoosePhotoName } = useUserDataStore()
    try {
        let time = new Date();
        const result = transformTime(time);
        setUserChoosePhotoName(result)
        const userRef = doc(db, "users", uid);
        await updateDoc(userRef, { currentPhotoName: result })
        const imagesRef = ref(storage, `userPhoto/${uid}/${result}`);

        await new Promise((resolve, reject) => {
            uploadBytes(imagesRef, file).then((snapshot: any) => {
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
    // const { isLogin, userChoosePhotoURL } = useUserDataStore()
    let resultURL = "";
    try {
        const url = await getDownloadURL(ref(storage, `userPhoto/${uid}/${photoName}`));
        resultURL = url;
    } catch (error: any) {
        console.error("FirebaseError:", error);
        // if (error.message.includes("storage/object-not-found")) {
        //     await updateUserPhoto(uid, "")
        // }
    }
    // console.log(isLogin?.photoURL)
    // console.log(userChoosePhotoURL)
    return resultURL;
};

export const checkChoosePhoto = async (uid: string) => {
    try {
        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef)
        let fileName;
        if (userSnap.exists()) {
            fileName = userSnap.data().currentPhotoName
        }
        return await getDownloadURL(ref(storage, `userPhoto/${uid}/${fileName}`));
    } catch (error: any) {
        console.error("FirebaseError:", error);
        if (error.message.includes("storage/object-not-found")) {
            await updateUserPhotoDoc(uid, "", "")
        }
    }

}