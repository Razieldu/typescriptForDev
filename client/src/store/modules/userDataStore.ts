import { userDataState } from "@/types"
export const useUserDataStore = defineStore("userData", {
  state: (): userDataState => ({
    isLogin: {},
  }),
  actions: {
    setLogin(user: any) {
      this.isLogin = user
    },
    logOut() {
      this.isLogin = {};
    },
  },
});
