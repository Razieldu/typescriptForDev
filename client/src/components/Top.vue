<template>
  <div
    class="flex items-center py-6 px-0 fixed top-0 w-full h-16 bg-sky-600 z-50"
  >
    <div v-if="isLogin === true" class="ml-10 flex items-center gap-0">
      <el-input
        v-model="inputValue"
        :placeholder="$t('basic.top.placeholder')"
      />
      <el-button @click="fuzzySearch(inputValue)" class="ml-3" type="primary">{{
        $t("basic.top.search")
      }}</el-button>
      <div class="absolute right-5">
        <router-link to="/login"
          ><el-button @click="logOut" type="primary">{{
            $t("basic.top.logout")
          }}</el-button></router-link
        >
      </div>
    </div>
    <button @click="switchToChinese()">中文</button>
    <button @click="switchToEnglish()">英文</button>
    <button @click="switchToKorean()">韓文</button>
  </div>
</template>
  
  <script lang="ts">
import { ref } from "vue";
import { useRightDataStore } from "../store/DataHandleStore";
import { useUserDataStore } from "../store/userDataStore";
import { useSettingStore } from "../store/settingStore";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";

export default {
  components: {},
  setup() {
    const { changeElementPlusLanguage } = useSettingStore();
    const inputValue = ref("");
    const rightDataStore = useRightDataStore();
    const { logOut } = useUserDataStore();
    const { isLogin } = storeToRefs(useUserDataStore());
    const { fuzzySearch } = rightDataStore;
    const { locale } = useI18n();
    const switchToEnglish = function () {
      // @ts-ignore
      changeElementPlusLanguage("en");
      locale.value = "en";
    };

    const switchToChinese = function () {
      // @ts-ignore
      changeElementPlusLanguage("zh-tw");
      locale.value = "zh-tw";
    };

    const switchToKorean = function () {
      changeElementPlusLanguage("ko");
    };
    return {
      switchToKorean,
      switchToChinese,
      switchToEnglish,
      logOut,
      isLogin,
      inputValue,
      fuzzySearch,
    };
  },
};
</script>
  
  