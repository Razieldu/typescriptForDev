import { userDataState } from "@/types"


export const useUserDataStore = defineStore("userData", {
  state: (): userDataState => ({
    isLogin: null,
  }),
  actions: {
    setLogin(user: any) {
      this.isLogin = user
    },
    logOut() {
      this.isLogin = null;
    },
  },
});
