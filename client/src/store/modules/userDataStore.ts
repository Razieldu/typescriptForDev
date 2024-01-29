import { userDataState } from "@/types"


export const useUserDataStore = defineStore("userData", {
  state: (): userDataState => ({
    isLogin: null,
    userChoosePhotoURL: "",
    userChoosePhotoFileName: ""
  }),
  actions: {
    setLogin(user: any) {
      this.isLogin = user
    },
    logOut() {
      this.isLogin = null;
    },
    setUserChoosePhotoURL(newPhotoURL: string) {
      this.userChoosePhotoURL = newPhotoURL
    },
    setUserChoosePhotoName(name: string) {
      this.userChoosePhotoFileName = name
    }
  },
});
