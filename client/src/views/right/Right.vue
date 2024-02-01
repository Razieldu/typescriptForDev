<template>
  <div class="ml-custom text-base bg-red-100 py-0 fixed halfDarkBg">
    <Buttons />
    <Tables :loadingToTable="loading" :dataToTable='mainContentData' />
    <Pagination v-model:page="currentPage" v-model:size="pageSize" :total="data.length" :background="true" :small="true"
      :hideOnSinglePage="true" />
    <Mydialogue />
  </div>
</template>

<script lang="ts" setup>
import Buttons from "./Buttons.vue"
import Tables from "./Table.vue"
import Pagination from "@/component/elementPlus/pagination/Pagination.vue"
import { useRightDataStore, useUserDataStore } from "@/store";
import { DataItem } from "@/types";
import { handlePagination } from "@/utils";
import Mydialogue from "@/component/elementPlus/dialogue/index.vue"

const mainContentData: Ref<DataItem[]> = ref([]);
const loading = ref(true);
let { currentPage, pageSize, handleShowData } = handlePagination(1, 10);

const {
  fetchData,
} = useRightDataStore();
const {
  data
} = storeToRefs(useRightDataStore());

const { isLogin } = storeToRefs(useUserDataStore())
watch(data, (newData) => (mainContentData.value = newData));
watch([currentPage, pageSize, data], ([curPage, size, newData]) => {
  mainContentData.value = handleShowData(curPage, size, newData);
});
onMounted(async () => {
  if (isLogin.value) {
    await fetchData(isLogin?.value?.uid);
    loading.value = false;
  }
});
</script>
