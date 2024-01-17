import { signOutUser } from "@/firebase/firebase.utils";
import router from "@/router/router";
import { removeEncryptedUserInfoFromLocal } from "@/utils";
import { useUserDataStore } from "@/store";

export const handleLogOut = async () => {
    const { logOut } = useUserDataStore()
    logOut()
    removeEncryptedUserInfoFromLocal()
    await signOutUser()
    setTimeout(() => {
        router.push("/login");
    }, 100);
}