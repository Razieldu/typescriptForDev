<template>
  <div class="flex justify-start items-center py-6 px-0 fixed top-0 w-full h-16 bg-sky-600 z-50 darkBg">
    <div class="flex justify-start items-center w-[275px] px-6 h-16 gap-2">
      <el-switch @click="toggleDark()" v-model="lightMode" :active-action-icon="Sunny" :inactive-action-icon="Moon">
      </el-switch>
      <el-select v-model="selectValue" clearable :placeholder="$t('basic.system.langPlaceholder')" class="select"
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
import { Moon, Sunny } from '@element-plus/icons-vue'
import AvatarAndMenu from "./AvatarAndMenu.vue"
import { dealWithLanguage } from "@/utils"


const inputValue = ref("");
const rightDataStore = useRightDataStore();
const { isLogin } = storeToRefs(useUserDataStore());
const { fuzzySearch } = rightDataStore;
const { t, locale } = useI18n();
const { handleLanguage } = dealWithLanguage(locale)


const lightMode = ref(true)
const selectValue = ref(localStorage.getItem("language") || "zh-tw")

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
    label: t("basic.system.option1"),
  },
  {
    value: "en",
    label: t("basic.system.option2"),
  },
  {
    value: "zh-cn",
    label: t("basic.system.option3"),
  },
  {
    value: "ja",
    label: t("basic.system.option4"),
  },

]);


const isDark = useDark()
const toggleDark = useToggle(isDark)
if (localStorage.getItem("vueuse-color-scheme") === "dark") {
  lightMode.value = false;
}
onMounted(() => {
  handleLanguage(selectValue.value)
})
</script>
<style scoped>
.select {
  width: 100px;
}
</style>
  
  