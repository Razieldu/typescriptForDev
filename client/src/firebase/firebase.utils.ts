
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signInWithRedirect, GithubAuthProvider } from "firebase/auth";
import { addDoc, getFirestore } from "firebase/firestore";
import { doc, serverTimestamp, getDoc, setDoc, updateDoc, collection, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, listAll, deleteObject } from "firebase/storage";
import { transformTime } from "@/utils";
import { useUserDataStore, useRightDataStore } from "@/store";
import { openMessage } from "@/utils"

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

googleProvider.setCustomParameters({
    prompt: 'select_account'
});

const githubProvider = new GithubAuthProvider()

export const auth = getAuth();

export const signInWithGooglePopup = async (t: Function) => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        let user = result?.user
        await createUserDocumentFromAuth(user)
        openMessage({ type: "success", message: `${user.displayName}${t("basic.login.successLogin")}`, showClose: true })
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
    const { fetchData, setLoading, setFirstTimeLogin } = useRightDataStore()
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
            biography: "",
            timestamp: serverTimestamp()
        }
        try {
            await setDoc(userDocRef, userData);
            await setUserMemberData(userAuth.uid)
            fetchData(userAuth.uid)
            setLoading(false)
            setFirstTimeLogin(false)
        } catch (error) {
            console.log('error creating the user', error);
        }
    }
    return userSnapshot
};

export const updateUserChoosePhotoInfo = async (uid: string, photoNewURL: string, photoName: string) => {
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
    return photoURL
}

export const sendToFirestoreWithCollection = async () => {
    try {
        const response = await fetch("../../data.json");
        if (!response.ok) {
            throw new Error('Failed to fetch local JSON file');
        }
        const localData = await response.json();
        const collectionRef = collection(db, 'mainData');
        localData.forEach(async (element: any) => {
            const docRef = await addDoc(collectionRef, element);
            console.log("Document written with ID: ", docRef.id);
        });
    } catch (error) {
        console.error('Error:', error);
    }
};

export const sendToFirestoreWithDoc = async () => {
    try {
        const response = await fetch("../../data.json");
        if (!response.ok) {
            throw new Error('Failed to fetch local JSON file');
        }
        const localData = await response.json();

        localData.forEach(async (element: any, index: number) => {
            const docRefs = doc(db, 'mainData', `${index + 1}`);
            await setDoc(docRefs, element);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}


///從firestore取得資料並把id作為m_id回傳資料到前端
export const getAllDocsFromFirestore = async (uid: string) => {
    let data: any = []
    const userDocRef = doc(db, 'usersMemberData', uid);
    const mainContentDataCollectionRef = collection(userDocRef, 'mainContentData')
    const querySnapshot = await getDocs(mainContentDataCollectionRef);
    querySnapshot.forEach((doc) => {
        let tempObj = {
            ...doc.data(),
            m_id: doc.id
        }
        data.push(tempObj)
    });
    return data
}

export const updateMemberData = async (newMember: any, dataId: string, uid: string) => {
    const userDocRef = doc(db, 'usersMemberData', `${uid}`);
    const mainContentDataCollectionRef = collection(userDocRef, 'mainContentData')
    const querySnapshot = await getDocs(mainContentDataCollectionRef);
    querySnapshot.forEach(async (doc) => {
        if (doc.id === dataId) {
            await setDoc(doc.ref, newMember);
        }
    });

}

export const addMemberData = async () => {
    const collectionRef = collection(db, 'mainData');
    const docRef = await addDoc(collectionRef, {});
    return docRef.id;
}

export const checKifUserExist = async (uid: string) => {
    let exists = false
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef)
    if (userSnap.exists()) {
        exists = true
    }
    return exists
}

export const setUserMemberData = async (uid: string) => {
    const querySnapshot = await getDocs(collection(db, "mainData"));
    const memberDataDoc = doc(db, 'usersMemberData', uid)
    const memberCollection = collection(memberDataDoc, "mainContentData")
    querySnapshot.forEach(async (doc) => {
        await addDoc(memberCollection, doc.data());
    });
}

export const saveLeftMenuToFirestore = async (uid: string) => {
    try {
        const response = await fetch("../../leftmenu.json");
        if (!response.ok) {
            throw new Error('Failed to fetch local JSON file');
        }
        const localData = await response.json();
        const memberDataDoc = doc(db, 'usersMemberData', uid);
        localData.forEach(async (subArray: any, index: number) => {
            subArray.forEach(async (item: any, indexS: number) => {
                const memberLeftDoc = doc(memberDataDoc, "leftMenuData", `${index}`);
                await addDoc(collection(memberLeftDoc, `${indexS}`), item)
            });
        });
    } catch (error) {
        console.error('Error:', error);
    }
};
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

export const getPhotoLocationURL = async (uid: string, photoName: string) => {
    let resultURL = "";

    try {
        const url = await getDownloadURL(ref(storage, `userPhoto/${uid}/${photoName}`));
        resultURL = url;
    } catch (error: any) {
        console.error("FirebaseError:", error);
    }

    return resultURL;
};

export const listUserChoosePhotoes = async (uid: string) => {
    const { setUserChoosePhotoList } = useUserDataStore()
    let resultUrls: string[] = []
    const listRef = ref(storage, `userPhoto/${uid}`);
    try {
        const res = await listAll(listRef);
        const urlPromises = res.items.map(async (eachPhoto) => {
            let pathArray = eachPhoto.fullPath.split("/")
            let fileName = pathArray[pathArray.length - 1]
            return getDownloadURL(ref(storage, `userPhoto/${uid}/${fileName}`));
        });
        const urls = await Promise.all(urlPromises);
        resultUrls = [...urls];
        setUserChoosePhotoList(resultUrls)
    } catch (error) {
        console.error(error);
    }
}
export const checkUserChoosePhotoIfExist = async (uid: string) => {
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
            await updateUserChoosePhotoInfo(uid, "", "")
        }
    }
}

export const deletePhoto = async (uid: string, fileName: string) => {
    const desertRef = ref(storage, `userPhoto/${uid}/${fileName}`);
    deleteObject(desertRef).then(() => {
    }).catch((error) => {
        console.log(error)
    });
}