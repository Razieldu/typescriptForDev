import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), AutoImport({
    dts: true,
    // include: [
    //   /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
    //   /\.vue$/,
    //   /\.vue\?vue/, // .vue
    //   /\.md$/, // .md
    // ],
    // dirs: [
    //   // './hooks',
    //   './composables', // only root modules
    //   './composables/**', // all nested modules
    //   // ...
    // ],
    imports: [
      // 需要自动导入的插件，自定义导入的API
      'vue',
      {
        'vue-router': [
          'useLink',
          'useRoute',
          'useRouter',
          'onBeforeRouteLeave',
          'onBeforeRouteUpdate',
          'createRouter',
          'createWebHistory',
        ],
      },
      {
        'xlsx': [
          'utils',
          'writeFileXLSX',
          'read'
        ]
      },
      {
        '@vueuse/core': ['useToggle','useDark']
      },
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
