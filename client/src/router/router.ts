
import { getCurrentUser } from "../firebase/firebase.utils"
import google from "@/assets/photo/google.svg"
import facebook from "@/assets/photo/facebookNew.png"
import github from "@/assets/photo/github.svg"
import { RouteLocationNormalized, NavigationGuardNext, RouteRecordRaw } from 'vue-router';
import { useUserDataStore } from "@/store";
import { onAuthStateChangedListener, getUserPhotoDoc } from "../firebase/firebase.utils";

const routes: RouteRecordRaw[] = [
  {
    path: "/login", name: "login",
    component: () => import("@/views/login/Login.vue"),
    meta: { preloadImages: true },
    beforeEnter: (to: RouteLocationNormalized, _from, next: NavigationGuardNext) => {
      preloadImagesIfNeeded(to, next);
    },
  },
  // {
  //   path: "/signUp", name: "signUp", component: () => import("@/views/signup/Signup.vue"), meta: { preloadImages: true }, beforeEnter: (to: RouteLocationNormalized, _from, next: NavigationGuardNext) => {
  //     preloadImagesIfNeeded(to, next);
  //   },
  // },
  { path: "/", name: "main", component: () => import("@/views/middle/Middle.vue"), meta: { requiresAuth: true }, },
  { path: "/profile", name: "profile", component: () => import("@/views/profile/Profile.vue"), meta: { requiresAuth: true }, }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const preloadImagesIfNeeded = (to: RouteLocationNormalized, next: NavigationGuardNext) => {
  if (to.meta.preloadImages) {
    let preloadCount = 0;

    const imagesToPreload = [google, facebook, github];

    imagesToPreload.forEach((imagePath) => {
      const img = new Image();
      img.onload = () => {
        preloadCount++;
        if (preloadCount === imagesToPreload.length) {
          // 所有圖片都已載入完成，執行 next() 跳轉到下一個路由
          next();
        }
      };
      img.src = imagePath;
    });
  } else {
    next();
  }
};


router.beforeEach(async (to, _, next) => {
  if (to.meta.requiresAuth && !(await getCurrentUser())) {
    next("/login")
  } else {
    const { setCurrentPhotoURL } = useUserDataStore()
    const { currentPhotoURL } = storeToRefs(useUserDataStore())
    if (currentPhotoURL.value === "" && to.path !== "/login") {
      onAuthStateChangedListener(async (user: any) => {
        const userUid = user?.uid
        let currentPhotoURL = await getUserPhotoDoc(userUid);
        setCurrentPhotoURL(currentPhotoURL)
      })
    }
    next()
  }
});
export default router;
