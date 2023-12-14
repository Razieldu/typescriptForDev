import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // resolve: {
  //   alias: {
  //     "@": path.resolve(__dirname, "src"),
  //     // api: path.resolve(__dirname, "src/apis"),
  //     // request: path.resolve(__dirname, "src/utils/request"),
  //     // i18n: path.resolve(__dirname, "src/i18n"),
  //     // store: path.resolve(__dirname, "src/store"),
  //     // types: path.resolve(__dirname, "src/types"),
  //     // views: path.resolve(__dirname, "src/views"),
  //     // components: path.resolve(__dirname, "src/components"),
  //     // utils: path.resolve(__dirname, "src/utils"),
  //     // interface: path.resolve(__dirname, "src/interface"),
  //     // ...extraAlias,
  //   },
  // },
})
