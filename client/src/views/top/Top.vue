<template>
  <div class="flex justify-start items-center py-6 px-0 fixed top-0 w-full h-16 bg-sky-600 z-50 darkBg">
    <div class="flex justify-start items-center w-[275px] px-6 h-16 gap-2">
      <el-switch @click="toggleDark()" v-model="lightMode" :active-action-icon="Sunny" :inactive-action-icon="Moon">
      </el-switch>
      <el-select v-model="selectValue" clearable :placeholder="$t('basic.login.placeholder')" class="select"
        @change="handleLanguage(selectValue)" effect="light" filterable>
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>

    <div v-if="isLogin" class="ml-10 flex items-center gap-0">
      <div v-if="ifAtMainPage" class="flex">
        <el-input v-model="inputValue" :placeholder="$t('basic.top.placeholder')" />
        <el-button @click="fuzzySearch(inputValue)" class="ml-3" type="primary">{{
          $t("basic.top.search")
        }}</el-button>
      </div>
      <AvatarAndMenu />
    </div>
  </div>
</template>

<script lang="ts" setup>

import { useRightDataStore } from "@/store";
import { useUserDataStore } from "@/store";
import { useSettingStore } from "@/store";
import { Moon, Sunny } from '@element-plus/icons-vue'
import AvatarAndMenu from "./AvatarAndMenu.vue"

const { changeElementPlusLanguage } = useSettingStore();
const inputValue = ref("");
const rightDataStore = useRightDataStore();
const { isLogin } = storeToRefs(useUserDataStore());
const { fuzzySearch } = rightDataStore;
const { t, locale } = useI18n();

const lightMode = ref(true)
const selectValue = ref("");
const router = useRouter()
const ifAtMainPage = computed(() => {
  if (router.currentRoute.value.name === "main") {
    return true
  } else {
    return false
  }

})

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
if (localStorage.getItem("vueuse-color-scheme") === "dark") {
  lightMode.value = false;
}
</script>
<style scoped>
.select {
  width: 100px;
}
</style>
  
  