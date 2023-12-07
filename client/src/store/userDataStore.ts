import { defineStore } from "pinia";

interface userDataState {
  isLogin: Boolean;
}

export const useUserDataStore = defineStore("userData", {
  state: (): userDataState => ({
    isLogin: false,
  }),
  actions: {
    login(account: string, password: string) {
      if (account === "" || password === ""){
          return "請確認帳號密碼訊息"
      };
      if (account === "s123@mail.com" && password === "123") {
        this.isLogin = true;
        return true;
      } else {
        return false;
      }
    },
    logOut() {
      this.isLogin = false;
    },
  },
});
