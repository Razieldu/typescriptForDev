import { createI18n } from "vue-i18n";
import LocalZhTw from "../i18n/lang/zh-tw";
import LocalEn from "../i18n/lang/en";
import LocalZhCn from "../i18n/lang/zh-cn";
import LocalZhJa from "../i18n/lang/ja";
const messages = {
  ["zh-tw"]: {
    basic: LocalZhTw,
  },
  ["en"]: {
    basic: LocalEn,
  },
  ["zh-cn"]: {
    basic: LocalZhCn,
  },
  ["ja"]: {
    basic: LocalZhJa,
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
  legacy: false,
  messages,
});
