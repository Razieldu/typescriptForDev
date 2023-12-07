<template>
  <div
    class="flex items-center py-6 px-0 fixed top-0 w-full h-16 bg-sky-600 z-50"
  >
    <div v-if="isLogin === true" class="ml-10 flex items-center gap-0">
      <el-input v-model="inputValue" :placeholder="$t('basic.top.placeholder')" />
      <el-button @click="fuzzySearch(inputValue)" class="ml-3" type="primary"
        >{{ $t("basic.top.search") }}</el-button
      >
      <div class="absolute right-5">
        <router-link to="/login"
          ><el-button @click="logOut" type="primary"
            >{{ $t("basic.top.logout") }}</el-button
          ></router-link
        >
      </div>
    </div>
  </div>
</template>
  
  <script lang="ts">
import { ref } from "vue";
import { useRightDataStore } from "../store/DataHandleStore";
import { useUserDataStore } from "../store/userDataStore";
import { storeToRefs } from "pinia";
export default {
  components: {},
  setup() {
    const inputValue = ref("");
    const rightDataStore = useRightDataStore();
    const { logOut } = useUserDataStore();
    const { isLogin } = storeToRefs(useUserDataStore());
    const { fuzzySearch } = rightDataStore;

    return {
      logOut,
      isLogin,
      inputValue,
      fuzzySearch,
    };
  },
};
</script>
  
  