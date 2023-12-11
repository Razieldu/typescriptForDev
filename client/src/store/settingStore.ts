import { defineStore } from "pinia";

interface settingState {
  language: string;
}

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
        case "ko":
          this.language = "ko";
          break;
        default:
          return;
      }
    },
  },
});
