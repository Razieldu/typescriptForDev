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
import { useSettingStore, useUserDataStore,useLeftDataStore } from "@/store";
import { onAuthStateChangedListener, getUserPhotoDoc, checkUserChoosePhotoIfExist, listUserChoosePhotoes } from "./firebase/firebase.utils"
import { handleLogOut } from "@/utils"

const { language } = storeToRefs(useSettingStore());
const { setLogin, setCurrentPhotoURL } = useUserDataStore();
const { handSetLeftMenuDataState } = useLeftDataStore()
const { isLogin } = storeToRefs(useUserDataStore())
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
      handSetLeftMenuDataState(user.uid)
      setLogin(user)
      router.push("/")
    } else {
      handleLogOut()
    }
  });
});



watch(isLogin, async (newVal, _oldVal) => {
  // 在这里执行相应的操作，例如重新渲染组件
  if (newVal) {
    let currentPhotoURL = await getUserPhotoDoc(newVal.uid);
    let ifHasChoosePhoto = await checkUserChoosePhotoIfExist(newVal?.uid)
    if (currentPhotoURL && ifHasChoosePhoto) {
      setCurrentPhotoURL(currentPhotoURL)
    } else {
      setCurrentPhotoURL(newVal.photoURL)
    }
    await listUserChoosePhotoes(newVal.uid)
  }
});
</script>
