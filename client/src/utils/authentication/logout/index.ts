import { signOutUser } from "@/firebase/firebase.utils";
import router from "@/router/router";
import { useUserDataStore } from "@/store";
import { useRightDataStore } from "@/store";
export const handleLogOut = async () => {
    const { logOut } = useUserDataStore()
    const { setLoading, setFirstTimeLogin } = useRightDataStore()
    logOut()
    setLoading(true)
    setFirstTimeLogin(true)
    await signOutUser()
    setTimeout(() => {
        router.push("/login");
    }, 100);
}