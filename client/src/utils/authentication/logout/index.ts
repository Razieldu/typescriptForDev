import { signOutUser } from "@/firebase/firebase.utils";
import router from "@/router/router";

import { useUserDataStore } from "@/store";

export const handleLogOut = async () => {
    const { logOut } = useUserDataStore()
    logOut()
    await signOutUser()
    setTimeout(() => {
        router.push("/login");
    }, 100);
}