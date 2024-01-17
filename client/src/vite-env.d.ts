/// <reference types="vite/client" />
// declare module '*.vue' {
//   import { Component } from 'vue';
//   const component: Component;
//   export default component;
// }

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'crypto-js';