import { defineStore } from "pinia";
import { userDataState } from "@/types"

export const useUserDataStore = defineStore("userData", {
  state: (): userDataState => ({
    isLogin: false,
  }),
  actions: {
    setLogin() {
      this.isLogin = true
    },
    login(account: string, password: string) {
      if (account === "" || password === "") {
        return "請確認帳號密碼訊息";
      }
      if (account === "s123@mail.com" && password === "123") {
        localStorage.setItem("login", "true");
        this.isLogin = true;
        return true;
      } else {
        return false;
      }
    },
    logOut() {
      this.isLogin = false;
      localStorage.removeItem("login");
    },
  },
});
