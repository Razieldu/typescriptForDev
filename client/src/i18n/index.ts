import { createI18n } from "vue-i18n";
import LocalZhCn from "../i18n/lang/zh-cn";
import LocalEn from "../i18n/lang/en";

const messages = {
  ["zh-cn"]: {
    basic: LocalZhCn,
  },
  ["en"]: {
    basic: LocalEn,
  },
};
//   const getLocale = () => {
//     const config = JSON.parse(localStorage.getItem("config") || "{}") as settingsStoreType["config"];
//     return config?.language || "zh-cn";
//   };

export const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  legacy:false,
  messages,
});
