<template>
  <el-config-provider :locale="locale">
    <div class="bg-red-100 h-[100vh] w-[100vw]">
      <Top />
      <router-view></router-view>
    </div>
  </el-config-provider>
</template>


<script lang="ts" setup>

import Top from "@/views/Top.vue";
import { computed, onMounted } from "vue";
import { ElConfigProvider } from "element-plus";
import ElementZhTWS from "element-plus/lib/locale/lang/zh-tw";
import ElementEn from "element-plus/lib/locale/lang/en";
import ElementZhCN from "element-plus/lib/locale/lang/zh-cn";
import ElementZhJA from "element-plus/lib/locale/lang/ja";
import { storeToRefs } from "pinia";
import { useSettingStore } from "@/store";
import { useUserDataStore } from "@/store";

const { language } = storeToRefs(useSettingStore());
const { setLogin } = useUserDataStore();
const languageState = computed(() => language.value);
const locale = computed(() => {
  switch (languageState.value) {
    case "en":
      return ElementEn;
    case "zh-tw":
      return ElementZhTWS;
    case "zh-cn":
      return ElementZhCN;  
    case　"ja":
      return ElementZhJA 
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

