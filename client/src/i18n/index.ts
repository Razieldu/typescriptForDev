import { createI18n } from "vue-i18n";
import LocalZhCn from "../i18n/lang/zh-tw";
import LocalEn from "../i18n/lang/en";

const messages = {
  ["zh-tw"]: {
    basic: LocalZhCn,
  },
  ["en"]: {
    basic: LocalEn,
  },
};
  // const getLocale = () => {
  //   const config = JSON.parse(localStorage.getItem("config") || "{}") as settingsStoreType["config"];
  //   return config?.language || "zh-cn";
  // };

export const i18n = createI18n({
  locale: "zh-tw",
  // locale:"en",
  fallbackLocale: "zh-tw",
  legacy:false,
  messages,
});
