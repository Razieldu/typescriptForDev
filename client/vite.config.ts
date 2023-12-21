import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import AutoImport from 'unplugin-auto-import/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), AutoImport({
    imports: [
      // 需要自动导入的插件，自定义导入的API
      'vue',
      'vue-router',
      'pinia',
      'vue-i18n',
    
      
    ]
  })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      i18n: path.resolve(__dirname, "src/i18n"),
      store: path.resolve(__dirname, "src/store"),
      types: path.resolve(__dirname, "src/types"),
      views: path.resolve(__dirname, "src/views"),
      utils: path.resolve(__dirname, "src/utils"),
      router: path.resolve(__dirname, "src/router"),
      component: path.resolve(__dirname, "src/component")
    },
  },
})
