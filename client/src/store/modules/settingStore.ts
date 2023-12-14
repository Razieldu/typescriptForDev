import { defineStore } from "pinia";
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
        case "ko":
          this.language = "ko";
          break;
        default:
          return;
      }
    },
  },
});
