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
      if (account === "s123@mail.com" && password === "123") {
        this.isLogin = true;
      }
    },
    logOut() {
      this.isLogin = false;
    },
  },
});
