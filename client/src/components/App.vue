<template>
  <el-config-provider :locale="locale">
    <div class="bg-red-100 h-[100vh] w-[100vw]">
      <Top />
      <!-- <Middle /> -->
      <router-view></router-view>
    </div>
  </el-config-provider>
</template>

<script lang="ts">
// import Middle from "./Middle.vue";
import Top from "./Top.vue";
import { defineComponent, watch,ref} from "vue";
import { ElConfigProvider } from "element-plus";
import ElementZhTWS from "element-plus/lib/locale/lang/zh-tw";
import ElementEn from "element-plus/lib/locale/lang/en";
import ElementKo from "element-plus/lib/locale/lang/ko";
import { storeToRefs } from "pinia";
import { useSettingStore } from "../store/settingStore";
// export default { name: "App", components: { Middle, Top } };
export default defineComponent({
  components: {
    ElConfigProvider,
    Top,
  },
  setup() {
    const { language } = storeToRefs(useSettingStore());
    const setLanguage = (language: string) => {
      switch (language) {
        case "en":
          return ElementEn;
        case "zh-tw":
          return ElementZhTWS;
        case "ko":
          return ElementKo;
      }
    };
    watch(language, (newLang) => {
      locale.value = setLanguage(newLang);
    });
    const locale = ref(setLanguage(language.value));
    
    return {
      language,
      locale,
    };
  },
});
</script>
