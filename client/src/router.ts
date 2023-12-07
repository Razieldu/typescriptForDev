import { createRouter, createWebHistory } from "vue-router";
import Login from "./components/Login.vue";
import Middle from "./components/Middle.vue";
import { useUserDataStore } from "./store/userDataStore";



const routes = [
  { path: "/login", name: "Login", component: Login },
  { path: "/", name: "App", component: Middle },
];

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});


router.beforeEach((to, from, next) => {
  // 在每次路由导航之前检查登录状态
  const userDataStore = useUserDataStore()
  if (!userDataStore.isLogin && to.name !== "Login") {
    // 如果未登录且不是前往登录页面，则导航到登录页面
    next("/login");
  } else {
    // 已登录或前往登录页面，允许导航
    next();
  }
});

export default router;
