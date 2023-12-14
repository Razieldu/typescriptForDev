import { createPinia } from "pinia";
export * from "./modules/DataHandleStore"
export * from "./modules/LeftDataHandleStore"
export * from "./modules/settingStore"
export * from "./modules/userDataStore"
export const pinia  = createPinia()