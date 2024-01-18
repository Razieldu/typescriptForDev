
import { getCurrentUser } from "../firebase/firebase.utils"
const routes = [
  { path: "/login", name: "login", component: () => import("@/views/login/Login.vue"), },
  { path: "/signUp", name: "signUp", component: () => import("@/views/signup/Signup.vue") },
  { path: "/", name: "main", component: () => import("@/views/middle/Middle.vue"), meta: { requiresAuth: true } },
  { path: "/profile", name: "profile", component: () => import("@/views/profile/Profile.vue"), meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach(async (to, _, next) => {
  if (to.meta.requiresAuth && !(await getCurrentUser())) {
    next("/login")
  } else {
    next()
  }
});
export default router;
