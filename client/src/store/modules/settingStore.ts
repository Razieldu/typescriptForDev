import { settingState } from "@/types"

export const useSettingStore = defineStore("setting", {
  state: (): settingState => ({
    language: "zh-tw",
  }),
  actions: {
    changeElementPlusLanguage(language: string) {
      switch (language) {
        case "en":
          this.language = "en";
          break;
        case "zh-tw":
          this.language = "zh-tw";
          break;
        case "zh-cn":
          this.language = "zh-cn";
          break;
        case "ja":
          this.language = "ja";
          break;
        default:
          return;
      }
    },
  },
});
