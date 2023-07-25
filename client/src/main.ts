import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "./assets/tailwind.css";
import "element-plus/dist/index.css";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { createPinia } from "pinia";
// import  router from './router.js';
const app = createApp(App);
const pinia = createPinia();
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
// app.use(router);
app.use(pinia)
app.use(ElementPlus);
app.mount("#app");
