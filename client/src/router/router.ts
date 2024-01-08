
import Login from "@/views/login/Login.vue";
import Middle from "@/views/middle/Middle.vue";
import Profile from "@/views/profile/Profile.vue"
import { useUserDataStore } from "@/store";

const routes = [
  { path: "/login", name: "Login", component: Login },
  { path: "/", name: "App", component: Middle },
  { path: "/profile", name: "Profile", component: Profile }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  const userDataStore = useUserDataStore();
  if (!userDataStore.isLogin && to.name !== "Login") {
    // 如果未登录且不是前往登录页面，则导航到登录页面
    next("/login");
  } else if (userDataStore.isLogin && to.name === "Login") {
    next("/")
  } else {
    // 已登录或前往登录页面，允许导航
    next();
  }
});

export default router;
