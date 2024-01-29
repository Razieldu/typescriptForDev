import { userDataState } from "@/types"


export const useUserDataStore = defineStore("userData", {
  state: (): userDataState => ({
    isLogin: null,
    currentPhotoURL: "",
    userChoosePhotoFileName: "",
    userGooglePhotoURL:"",
  }),
  actions: {
    setLogin(user: any) {
      this.isLogin = user
    },
    logOut() {
      this.isLogin = null;
    },
    setCurrentPhotoURL(newPhotoURL: string) {
      this.currentPhotoURL = newPhotoURL
    },
    setUserChoosePhotoName(name: string) {
      this.userChoosePhotoFileName = name
    }
  },
});
