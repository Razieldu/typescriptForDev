<template>
  <el-config-provider :locale="locale">
    <div class="bg-red-100 h-[100vh] w-[100vw]">
      <Top />
      <router-view></router-view>
    </div>
  </el-config-provider>
</template>


<script lang="ts" setup>

import Top from "./Top.vue";
import { computed, onMounted } from "vue";
import { ElConfigProvider } from "element-plus";
import ElementZhTWS from "element-plus/lib/locale/lang/zh-tw";
import ElementEn from "element-plus/lib/locale/lang/en";
import ElementKo from "element-plus/lib/locale/lang/ko";
import { storeToRefs } from "pinia";
import { useSettingStore } from "../store/settingStore";
import { useUserDataStore } from "../store/userDataStore";


const { language } = storeToRefs(useSettingStore());
const { setLogin } = useUserDataStore();
const languageState = computed(() => language.value);
const locale = computed(() => {
  switch (languageState.value) {
    case "en":
      return ElementEn;
    case "zh-tw":
      return ElementZhTWS;
    case "ko":
      return ElementKo;
    default:
      return ElementZhTWS;
  }
});

onMounted(() => {
  let isLogin = localStorage.getItem("login");
  if (isLogin) {
    setLogin();
  }
});  
</script>

