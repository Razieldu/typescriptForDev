<template>
  <div class="flex justify-start items-center py-6 px-0 fixed top-0 w-full h-16 bg-sky-600 z-50 darkBg">
    <div class="flex justify-start items-center w-[275px] px-6 h-16 gap-2">
      <el-switch @click="toggleDark()" v-model="value1" :active-action-icon="Sunny" :inactive-action-icon="Moon">
        <!-- <template #active-action>
          <span class="custom-active-action">L</span>
        </template>
        <template #inactive-action>
          <span class="custom-inactive-action">D</span>
        </template> -->
      </el-switch>
      <el-select v-model="selectValue" clearable :placeholder="$t('basic.login.placeholder')" class="select"
        @change="handleLanguage(selectValue)" effect="light" filterable>
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>

    <div v-if="isLogin === true" class="ml-10 flex items-center gap-0">
      <el-input v-model="inputValue" :placeholder="$t('basic.top.placeholder')" />
      <el-button @click="fuzzySearch(inputValue)" class="ml-3" type="primary">{{
        $t("basic.top.search")
      }}</el-button>
      <div class="absolute right-5">
        <router-link to="/login"><el-button @click="logOut" type="primary">{{
          $t("basic.top.logout")
        }}</el-button></router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { useRightDataStore } from "@/store";
import { useUserDataStore } from "@/store";
import { useSettingStore } from "@/store";
import { Moon, Sunny } from '@element-plus/icons-vue'
// import { useDark, useToggle } from "@vueuse/core"
const { changeElementPlusLanguage } = useSettingStore();
const inputValue = ref("");
const rightDataStore = useRightDataStore();
const { logOut } = useUserDataStore();
const { isLogin } = storeToRefs(useUserDataStore());
const { fuzzySearch } = rightDataStore;
const { t, locale } = useI18n();

const value1 = ref(true)
const selectValue = ref("");
const options = computed(() => [
  {
    value: "zh-tw",
    label: t("basic.login.option1"),
  },
  {
    value: "en",
    label: t("basic.login.option2"),
  },
  {
    value: "zh-cn",
    label: t("basic.login.option3"),
  },
  {
    value: "ja",
    label: t("basic.login.option4"),
  },

]);

const switchToEnglish = function () {
  // @ts-ignore
  changeElementPlusLanguage("en");
  locale.value = "en";
};

const switchToTwChinese = function () {
  // @ts-ignore
  changeElementPlusLanguage("zh-tw");
  locale.value = "zh-tw";
};

const switchToChinaChinese = function () {
  changeElementPlusLanguage("zh-cn");
  locale.value = "zh-cn"
};

const switchToJapanese = function () {
  changeElementPlusLanguage("ja");
  locale.value = "ja"
};

const handleLanguage = (language: string) => {
  switch (language) {
    case "zh-tw":
      switchToTwChinese();
      break;
    case "en":
      switchToEnglish();
      break;
    case "zh-cn":
      switchToChinaChinese();
      break;
    case "ja":
      switchToJapanese()
      break
  }
};
const isDark = useDark()
const toggleDark = useToggle(isDark)
console.log(isDark,"isDark")
</script>
<style scoped>
.select {
  width: 100px;
}
</style>
  
  