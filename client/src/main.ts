// import "./style.css";
import App from "./App.vue"
import "@/assets/tailwind.css";
import "element-plus/dist/index.css";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { pinia } from "@/store";
import router from "@/router/router";
import { i18n } from "@/i18n";
import 'element-plus/theme-chalk/dark/css-vars.css'
import './styles/dark/css-vars.css'
const app = createApp(App);
app.use(pinia);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(router);
app.use(i18n);
app.use(ElementPlus);
app.mount("#app");
