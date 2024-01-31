import { userDataState } from "@/types"


export const useUserDataStore = defineStore("userData", {
  state: (): userDataState => ({
    isLogin: null,
    currentPhotoURL: "",
    userChoosePhotoFileName: "",
    list: []
    // userGooglePhotoURL:"",
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
    },
    setUserChoosePhotoList(listPhotoes: string[]) {
      this.list = [...listPhotoes]
    }
  },
});
