import { useUserDataStore } from "@/store";
import { createAuthUserWithEmailAndPassword } from "@/firebase/firebase.utils";
import router from "@/router/router";
import { openMessage } from "@/utils"
import { saveEncryptedUserInfoToLocal } from "@/utils";

export const handleSignUp = async (account: string, password: string, t: Function) => {
  const { setLogin } = useUserDataStore();
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
    const authResult = await createAuthUserWithEmailAndPassword(account, password);
    const user = authResult?.user;
    if (user) {
      setLogin(user);
      saveEncryptedUserInfoToLocal(user)
      openMessage({ type: "success", message: t("basic.signUp.successSignUp"), showClose: true });
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
    console.log(error)
    if (error.code === 'auth/email-already-in-use') {
      openMessage({
        type: "error",
        message: t("basic.system.emailAlreadyInUse"),
        showClose: true,
      });
    } else if (error.code === "auth/invalid-email") {
      openMessage({
        type: "error",
        message: t("basic.system.invalidEmail"),
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
};