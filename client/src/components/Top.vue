<template>
  <div
    class="flex justify-start items-center py-6 px-0 fixed top-0 w-full h-16 bg-sky-600 z-50"
  >
    <div class="flex justify-start items-center w-[270px] px-6 h-16">
      <!-- <el-icon size="large"><ChromeFilled  /></el-icon> -->
      <el-select
        v-model="selectValue"
        clearable
        :placeholder="$t('basic.login.placeholder')"
        class="select"
        @change="handleLanguage(selectValue)"
        effect="light"
        filterable
        filter-method
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>

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
  </div>
</template>
  
  <script lang="ts">
import { ref, computed } from "vue";
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
    const i18n = useI18n();
    const { locale } = i18n;
    const selectValue = ref("");
    const options = computed(() => [
      {
        value: "zh-tw",
        label: i18n.t("basic.login.option1"),
      },
      {
        value: "en",
        label: i18n.t("basic.login.option2"),
      },
      {
        value: "ko",
        label: i18n.t("basic.login.option3"),
      },
    ]);

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
    const handleLanguage = (language: string) => {
      switch (language) {
        case "zh-tw":
          switchToChinese();
          break;
        case "en":
          switchToEnglish();
          break;
        case "ko":
          switchToKorean();
          break;
      }
    };
    return {
      handleLanguage,
      selectValue,
      options,
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
<style scoped>
.select {
  width: 100px;
}
</style>
  
  