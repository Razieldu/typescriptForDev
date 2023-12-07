import { createApp } from "vue";
import "./style.css";
import App from "../src/components/App.vue";

// import Login from "../src/components/Login.vue";
import "./assets/tailwind.css";
import "element-plus/dist/index.css";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { createPinia } from "pinia";
import router from "./router.js";
import { i18n } from "./i18n";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(router);
app.use(i18n)
app.use(ElementPlus);
app.mount("#app");
