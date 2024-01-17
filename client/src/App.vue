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
import { onAuthStateChangedListener, signOutUser } from "./firebase/firebase.utils"
// import { saveEncryptedUserInfoToLocal } from "@/utils"
// import router from "@/router/router";

const { language } = storeToRefs(useSettingStore());
const { setLogin, logOut } = useUserDataStore();
const languageState = computed(() => language.value);
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

onMounted(() => {
  onAuthStateChangedListener(async (user: any) => {
    if (user) {

      let data = {
        email: user.email,
        emailVerified:user.emailVerified,
        mataData: user.metadata,
        photoURL: user.photoURL
      }
      console.log(data)
      setLogin(user)
    } else {
      logOut()
      await signOutUser()
    }
  });
});
</script>
