<template>
  <div class="ml-custom text-base bg-red-100 py-0 fixed">
    <div>
      <div class="pl-1 py-2 flex">
        <el-button @click="resetSearchResult()" type="primary">
          {{ $t("basic.right.mainPage") }}
        </el-button>
        <el-button @click="handleAddNewData()" type="primary">{{
          $t("basic.right.addNewData")
        }}</el-button>
        <el-button @click="handleExportFile" type="primary">Excel</el-button>
        <el-button @click="openDialog('AddNewPage')" type="primary">{{
          $t("basic.right.buildPage")
        }}</el-button>
        <el-button @click="openDialog('AddTargetPage')" type="primary" :disabled="shouldDisableButton">
          {{ $t("basic.right.addToPage") }}
        </el-button>
        <el-button type="primary" @click="batchDelete(currentSelectedDataId, dataUpdateToSelectPage)">
          {{ $t("basic.right.deleteMany") }}
        </el-button>
        <el-button v-if="currentSelectedDataId !== ''" @click="openDialog('UpdateToCurrentPage')" type="primary">
          {{ $t("basic.right.updatePage") }}
        </el-button>
      </div>
    </div>
    <el-table v-loading="loading" highlight-current-row stripe :data="mainContentData" style="height: 76vh; width: 80vw"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column :key="'姓名'" :label="$t('basic.right.title.name')" :prop="$t('basic.right.title.name')" width="120"
        fixed>
        <template #default="{ row, $index }">
          <div v-if="currentEditCell[0] === '姓名' && currentEditCell[1] === $index
            ">
            <el-input ref="cellInput" v-model="row['姓名']"
              :placeholder="`${$t('basic.right.title.pleaseEnter')} ${$t('basic.right.title.name')}`"
              @blur="currentEditCell = []" @change="handleUpdateData(row)" />
          </div>
          <div v-else @click="handleCellEdit('姓名', $index)">
            {{ row["姓名"] || $t("basic.right.title.noName") }}
          </div>
        </template>
      </el-table-column>
      <el-table-column v-for="eachObj in contentTitle" :key="(eachObj.key)" :label="$t(eachObj.title)"
        :prop="$t(eachObj.title)" :width="eachObj.title === 'basic.right.title.email' ? 250 : 150">
        <template #default="{ row, $index }">
          <div v-if="currentEditCell[0] === eachObj.key &&
            currentEditCell[1] === $index
            ">
            <el-input ref="cellInput" v-model="row[eachObj.key]"
              :placeholder="`${$t('basic.right.title.pleaseEnter')} ${$t(eachObj.title)}`" @blur="currentEditCell = []"
              @change="handleUpdateData(row)" />
          </div>
          <div v-else @click="handleCellEdit(eachObj.key, $index)">
            {{ row[eachObj.key] || $t("basic.right.title.noName") }}
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" :label="$t('basic.right.title.operation')" width="150">
        <template #default="scope">
          <el-button size="small" @click="handleEditMode">{{
            $t(buttonContent)
          }}</el-button>
          <el-button size="small" type="danger" @click="handleRowDelete(scope.row.m_id, currentSelectedDataId)">
            {{ $t("basic.right.deleteMode") }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex justify-center pt-3 pb-2">
      <el-pagination class="bg-transparent" @size-change="pageSize = $event" @current-change="currentPage = $event"
        @prev-click="currentPage -= 1" @next-click="currentPage += 1" :page-sizes="[10, 20, 30, 40]" small
        layout="sizes, prev, pager, next, jumper" :total="100" v-model:current-page="currentPage"
        v-model:page-size="pageSize" />
    </div>
    <Mydialogue />
  </div>
</template>

<script lang="ts" setup>

import { useRightDataStore } from "@/store";
import { exportFile } from "@/utils";
import { DataItem } from "@/types";
import { rowEditFunction } from "@/utils";
import { handlePagination } from "@/utils";
import { computeFn } from "@/utils";
import { ContentTitleItem } from "@/types";
import Mydialogue from "@/component/dialogue/index.vue"
import { addDialog } from "@/component/dialogue/index"
import addNewPage from "@/component/dialogue/dialogues/addNewPage.vue"
import updateToCurrentPage from "@/component/dialogue/dialogues/updateToCurrentPage.vue";
import addToTargetPage from "@/component/dialogue/dialogues/addToTargetPage.vue";

const { t } = useI18n()

const openDialog = (target: string) => {
  const componentSwitch = (target: string) => {
    switch (target) {
      case "AddNewPage":
        return { content: addNewPage, title: t('basic.right.newPageTitle'), id: target + '1' }
      case "AddTargetPage":
        return { content: addToTargetPage, title: t('basic.right.addToTargetPageTitle'), id: target + "2" }
      case "UpdateToCurrentPage":
        return { content: updateToCurrentPage, title: t('basic.right.updateCurrentPageTitle'), id: target + "3" }
      default:
        return null
    }
  }
  let targetItem = componentSwitch(target)
  if (targetItem) {
    addDialog({
      title: targetItem?.title,
      width: "700px",
      props: {
        id: targetItem.id
      },
      component: markRaw(targetItem?.content),
      callBack: (data: any) => {
        //当弹窗任务结束后，调用父页面的回掉函数。（比如我新增完成了需要刷新列表页面）
        console.log("回调函数", data)
      }
    })
  }
}






const contentTitle: Ref<ContentTitleItem[]> = ref([
  { title: "basic.right.title.email", key: "Email" },
  { title: "basic.right.title.company", key: "服務單位" },
  { title: "basic.right.title.jobTitle", key: "職稱" },
  { title: "basic.right.title.zip", key: "郵遞區號" },
  { title: "basic.right.title.address", key: "地址" },
  { title: "basic.right.title.zip2", key: "郵遞區號2" },
  { title: "basic.right.title.address2", key: "地址2" },
  { title: "basic.right.title.tel_company", key: "連絡電話_公司" },
  { title: "basic.right.title.tel_secretary", key: "連絡電話_秘書" },
  { title: "basic.right.title.tel_home", key: "連絡電話_住宅" },
  { title: "basic.right.title.phone", key: "連絡電話_手機" },
  { title: "basic.right.title.tel1", key: "連絡電話1" },
  { title: "basic.right.title.tel2", key: "連絡電話2" },
  { title: "basic.right.title.fax", key: "傳真電話" },
  { title: "basic.right.title.fax2", key: "傳真2" },
]);
const mainContentData: Ref<DataItem[]> = ref([]);
const loading = ref(true);

let {
  currentEditCell,
  buttonContent,
  handleEditMode,
  handleCellEdit,
  handleSelectionChange,
} = rowEditFunction();
let { currentPage, pageSize, handleShowData } = handlePagination(1, 10);
let { shouldDisableButton } = computeFn();
const {
  fetchData,
  resetSearchResult,
  handleRowDelete,
  handleAddNewData,
  handleUpdateData,
  batchDelete,
} = useRightDataStore();
const {
  data,
  currentSelectedDataId,
  dataUpdateToSelectPage,
} = storeToRefs(useRightDataStore());

const handleExportFile = () => {
  exportFile(mainContentData);
};

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
<style scoped></style>