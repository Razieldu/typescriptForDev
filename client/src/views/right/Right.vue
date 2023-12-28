<template>
  <div class="ml-custom text-base bg-red-100 py-0 fixed halfDarkBg">
    <Buttons />
    <Tables :loadingToTable="loading" :dataToTable='mainContentData' />
    <div class="flex justify-center pt-3 pb-2 ">
      <el-pagination 
        class="bg-transparent infoBg" 
        @size-change="pageSize = $event" 
        @current-change="currentPage = $event"
        @prev-click="currentPage -= 1" 
        @next-click="currentPage += 1" 
        :page-sizes="[10, 20, 30, 40]" small
        layout="sizes, prev, pager, next, jumper" 
        :total="100" 
        v-model:current-page="currentPage"
        v-model:page-size="pageSize" />
    </div>
    <Paginations/>
    <Mydialogue />
  </div>
</template>

<script lang="ts" setup>
import Buttons from "./Buttons.vue"
import Tables from "./Table.vue"
import { useRightDataStore } from "@/store";
import { DataItem } from "@/types";
import { handlePagination } from "@/utils";
import Mydialogue from "@/component/dialogue/index.vue"

const mainContentData: Ref<DataItem[]> = ref([]);
const loading = ref(true);
let { currentPage, pageSize, handleShowData } = handlePagination(1, 10);

const {
  fetchData,
} = useRightDataStore();
const {
  data
} = storeToRefs(useRightDataStore());


watch(data, (newData) => (mainContentData.value = newData));
watch([currentPage, pageSize, data], ([curPage, size, newData]) => {
  mainContentData.value = handleShowData(curPage, size, newData);
});
onMounted(async () => {
  const mainData = await fetchData();
  loading.value = false;

  if (mainData !== undefined) {
    mainContentData.value = handleShowData(
      currentPage.value,
      pageSize.value,
      mainData
    );
  }
});
</script>
