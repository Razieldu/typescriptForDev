<template>
  <el-config-provider :locale="locale">
    <div class="bg-red-100 h-[100vh] w-[100vw] halfDarkBg">
      <Top />
      <router-view></router-view>
    </div>
  </el-config-provider>
</template>


<script lang="ts" setup>

import Top from "@/views/top/Top.vue";
import { ElConfigProvider } from "element-plus";
import ElementZhTWS from "element-plus/es/locale/lang/zh-tw";
import ElementEn from "element-plus/es/locale/lang/en";
import ElementZhCN from "element-plus/es/locale/lang/zh-cn";
import ElementZhJA from "element-plus/es/locale/lang/ja";
import { useSettingStore } from "@/store";
import { useUserDataStore } from "@/store";
import { onAuthStateChangedListener, getUserPhoto } from "./firebase/firebase.utils"
import { handleLogOut } from "@/utils"

const { language } = storeToRefs(useSettingStore());
const { setLogin, updatePhoto} = useUserDataStore();
const {userNewPhoto,isLogin } = storeToRefs(useUserDataStore())
const languageState = computed(() => language.value);
import router from "@/router/router"

const locale = computed(() => {
  switch (languageState.value) {
    case "en":
      return ElementEn;
    case "zh-tw":
      return ElementZhTWS;
    case "zh-cn":
      return ElementZhCN;
    case "ja":
      return ElementZhJA
    default:
      return ElementZhTWS;
  }
});

onMounted(async () => {
  onAuthStateChangedListener(async (user: any) => {
    if (user) {
      console.log(user, "onAuthStateChange")
      setLogin(user)
      router.push("/")
    } else {
      handleLogOut()
    }
  });

  if (isLogin.value) {
    try {
      let updatePhotoURL = await getUserPhoto(isLogin.value.uid);
      updatePhoto(updatePhotoURL)
      console.log(updatePhotoURL)
    } catch (error) {
      console.error(error);
      // 在处理错误的情况下进行相应的处理
    }
  }
});

watch(isLogin, async (newVal, _oldVal) => {
  // 在这里执行相应的操作，例如重新渲染组件
  if (newVal) {
    let updatePhotoURL = await getUserPhoto(newVal.uid);
    console.log(updatePhotoURL)
    updatePhoto(updatePhotoURL);
    console.log('isLogin 已更新:', newVal);
  }
});

// 监听 userNewPhoto 的变化
watch(userNewPhoto, async (newVal, _oldVal) => {
  // 在这里执行相应的操作，例如重新渲染组件
  if (newVal) {
    let updatePhotoURL = await getUserPhoto(isLogin?.value.uid);
    console.log(updatePhotoURL)
    updatePhoto(updatePhotoURL);
    console.log('userNewPhoto 已更新:', newVal);
  }
});
</script>
