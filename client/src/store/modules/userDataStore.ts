import { userDataState } from "@/types"


export const useUserDataStore = defineStore("userData", {
  state: (): userDataState => ({
    isLogin: null,
    userNewPhoto: ""
  }),
  actions: {
    setLogin(user: any) {
      this.isLogin = user
    },
    logOut() {
      this.isLogin = null;
    },
    updatePhoto(newPhotoURL: string) {
      this.userNewPhoto = newPhotoURL
    }
  },
});
