
import Login from "@/views/login/Login.vue";
import Middle from "@/views/middle/Middle.vue";
import Profile from "@/views/profile/Profile.vue"
import Signup from "@/views/signup/Signup.vue"
import { useUserDataStore } from "@/store";

const routes = [
  { path: "/login", name: "Login", component: Login },
  { path: "/signUp", name: "Signup", component: Signup },
  { path: "/", name: "App", component: Middle },
  { path: "/profile", name: "Profile", component: Profile }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  const userDataStore = useUserDataStore();

  if (!userDataStore.isLogin) {
    // 用户未登录
    if (to.name === "login" || to.name === "signup") {
      // 允许导航到登录或注册页面
      next();
    } else {
      // 重定向到登录页
      next("/login");
    }
  } else {
    // 用户已登录
    if (to.name === "login" || to.name === "signup") {
      // 已登录的情况下，访问登录或注册页面会重定向到主页
      next("/");
    } else {
      // 允许导航到其他页面
      next();
    }
  }
});


export default router;
