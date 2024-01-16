import router from "@/router/router";
import { openMessage } from "@/utils"
import { signInAuthUserWithEmailAndPassword } from "@/firebase/firebase.utils"
import { useUserDataStore } from "@/store";



export const handleLogin = async (account: string, password: string, t: Function) => {
  const { setLogin } = useUserDataStore()
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(account)) {
    openMessage({
      type: "error",
      message: t("basic.system.invalidEmail"),
      showClose: true,
    });
    return;
  }
  try {
    const authResult = await signInAuthUserWithEmailAndPassword(account, password)
    if (authResult?.user) {
      console.log(authResult.user)
      setLogin(authResult.user)
      openMessage({ type: "success", message: t("basic.login.successLogin"), showClose: true });
      setTimeout(() => {
        router.push("/");
      }, 100);
    } else {
      openMessage({
        type: "error",
        message: t("basic.system.checkAccountAndPassword"),
        showClose: true,
      });
    }
  } catch (error: any) {
    console.log('user sign in failed', error);
    if (error.code === "auth/invalid-email") {
      openMessage({
        type: "error",
        message: t("basic.system.invalidEmail"),
        showClose: true,
      });
    } else if (error.code === "auth/invalid-credential") {
      openMessage({
        type: "error",
        message: t("basic.system.wrongCredential"),
        showClose: true,
      });
    } else {
      openMessage({
        type: "error",
        message: t("basic.system.checkAccountAndPassword"),
        showClose: true,
      });
    }
  }
}