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
        <el-button @click="dialogAddFormVisible = true" type="primary">{{
          $t("basic.right.buildPage")
        }}</el-button>
        <el-button
          @click="handleUpdateToSelectedPageDialogVisible(true)"
          type="primary"
          :disabled="shouldDisableButton"
        >
          {{ $t("basic.right.addToPage") }}
        </el-button>
        <el-button
          type="primary"
          @click="batchDelete(currentSelectedDataId, dataUpdateToSelectPage)"
        >
          {{ $t("basic.right.deleteMany") }}
        </el-button>
        <el-button
          v-if="currentSelectedDataId !== ''"
          @click="dialogUpdateFormVisible = true"
          type="primary"
        >
          {{ $t("basic.right.updatePage") }}
        </el-button>
      </div>
    </div>
    <el-table
      v-loading="loading"
      highlight-current-row
      stripe
      :data="mainContentData"
      style="height: 76vh; width: 80vw"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column :key="'姓名'" label="姓名" prop="姓名" width="120" fixed>
        <template #default="{ row, $index }">
          <div
            v-if="
              currentEditCell[0] === '姓名' && currentEditCell[1] === $index
            "
          >
            <el-input
              ref="cellInput"
              v-model="row['姓名']"
              :placeholder="`请输入${'姓名'}`"
              @blur="currentEditCell = []"
              @change="handleUpdateData(row)"
            />
          </div>
          <div v-else @click="handleCellEdit('姓名', $index)">
            {{ row["姓名"] || "無" }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-for="eachObj in contentTitle"
        :key="eachObj.key"
        :label="eachObj.title"
        :prop="eachObj.title"
        :width="eachObj.title === 'Email' ? 250 : 150"
      >
        <template #default="{ row, $index }">
          <div
            v-if="
              currentEditCell[0] === eachObj.key &&
              currentEditCell[1] === $index
            "
          >
            <el-input
              ref="cellInput"
              v-model="row[eachObj.key]"
              :placeholder="`请输入${eachObj.title}`"
              @blur="currentEditCell = []"
              @change="handleUpdateData(row)"
            />
          </div>
          <div v-else @click="handleCellEdit(eachObj.key, $index)">
            {{ row[eachObj.key] || "無" }}
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template #default="scope">
          <el-button size="small" @click="handleEditMode">{{$t(buttonContent)
          }}</el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleRowDelete(scope.row.m_id, currentSelectedDataId)"
            > {{ $t("basic.right.deleteMode") }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="flex justify-center pt-3 pb-2">
      <el-pagination
        class="bg-transparent"
        @size-change="pageSize = $event"
        @current-change="currentPage = $event"
        @prev-click="currentPage -= 1"
        @next-click="currentPage += 1"
        :page-sizes="[10, 20, 30, 40]"
        small
        layout="sizes, prev, pager, next, jumper"
        :total="100"
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
      />
    </div>
    <el-dialog
      class="fixed top-20"
      v-model="dialogAddFormVisible"
      :title="$t('basic.right.newPageTitle')"
    >
      <el-form :model="form">
        <el-form-item
          :label="$t('basic.right.newPageLabel')"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.title"
            autocomplete="off"
            :placeholder="$t('basic.right.enterNewPageTitlePlaceholer')"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleAddDialogVisible(false)">
            {{ $t("basic.right.cancel") }}</el-button
          >
          <el-button
            type="primary"
            @click="
              handleSelectedData(
                form.title,
                handleAddDialogVisible,
                resetTitleInput
              )
            "
          >
            {{ $t("basic.right.confirm") }}
          </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      v-if="currentSelectedDataId !== ''"
      class="fixed top-20"
      v-model="dialogUpdateFormVisible"
      :title="$t('basic.right.updateCurrentPageTitle')"
    >
      <el-form :model="form">
        <el-form-item :label="$t('basic.right.updateCurrentPageLabel')" :label-width="formLabelWidth">
          <el-input v-model="selectedDataTitle" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleUpdateDialogVisible(false)"> {{ $t("basic.right.cancel") }}</el-button>
          <el-button
            @click="
              updateSelectedData(
                currentSelectedDataId,
                handleUpdateDialogVisible,
                selectedDataTitle
              )
            "
          >
          {{ $t("basic.right.confirm") }}
          </el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog
      class="fixed top-20"
      v-model="dialogUpdateToSelectedPageFormVisible"
      :title="$t('basic.right.addToTargetPageTitle')"
    >
      <el-form :model="form">
        <el-form-item :label="$t('basic.right.addToTargetPageLabel')" :label-width="formLabelWidth">
          <el-select
            v-model="updateToSelectedFormValue"
            filterable
            allow-create
            default-first-option
            :reserve-keyword="false"
            :placeholder="$t('basic.right.selectTargetPageTitle')"
          >
            <el-option
              v-for="item in selectedData"
              :key="item.id"
              :label="item.title"
              :value="item.title"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleUpdateToSelectedPageDialogVisible(false)"
            > {{ $t("basic.right.cancel") }}</el-button
          >
          <el-button
            @click="
              updateToSelectedPageData(
                findId(updateToSelectedFormValue, selectedData),
                dataUpdateToSelectPage,
                handleUpdateToSelectedPageDialogVisible
              )
            "
          >
          {{ $t("basic.right.confirm") }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, watch, reactive, Ref } from "vue";
import { useRightDataStore } from "../store/DataHandleStore";
import { storeToRefs } from "pinia";
import { exportFile } from "../utils/exportExcel";
import { DataItem } from "../typescriptDefine/type";
import { createDialogVisibility } from "../utils/handleDialogueWindow";
import { targetUpdateDataId, findId } from "../utils/targetUpdateDataId";
import { rowEditFunction } from "../utils/tableEdit";
import { handlePagination } from "../utils/pagination";
import { computeFn } from "../utils/compute";
import { ContentTitleItem } from "../typescriptDefine/type";

export default {
  setup() {
    const contentTitle: Ref<ContentTitleItem[]> = ref([
      { title: "Email", key: "Email" },
      { title: "服務單位", key: "服務單位" },
      { title: "職稱", key: "職稱" },
      { title: "郵遞區號", key: "郵遞區號" },
      { title: "地址", key: "地址" },
      { title: "郵遞區號2", key: "郵遞區號2" },
      { title: "地址2", key: "地址2" },
      { title: "連絡電話_公司", key: "連絡電話_公司" },
      { title: "連絡電話_秘書", key: "連絡電話_秘書" },
      { title: "連絡電話_住宅", key: "連絡電話_住宅" },
      { title: "連絡電話_手機", key: "連絡電話_手機" },
      { title: "連絡電話1", key: "連絡電話1" },
      { title: "連絡電話2", key: "連絡電話2" },
      { title: "傳真電話", key: "傳真電話" },
      { title: "傳真2", key: "傳真2" },
    ]);
    const mainContentData: Ref<DataItem[]> = ref([]);
    const loading = ref(true);

    let {
      currentEditCell,
      editMode,
      buttonContent,
      handleEditMode,
      handleCellEdit,
      handleSelectionChange,
    } = rowEditFunction();
    let { currentPage, pageSize, handleShowData } = handlePagination(1, 10);
    let { selectedDataTitle, shouldDisableButton } = computeFn();
    const {
      fetchData,
      resetSearchResult,
      handleRowDelete,
      handleAddNewData,
      handleUpdateData,
      handleSelectedData,
      updateSelectedData,
      setDataToUpdateSelectDataPage,
      updateToSelectedPageData,
      batchDelete,
    } = useRightDataStore();
    const {
      data,
      currentSelectedDataId,
      currentSelectedData,
      dataUpdateToSelectPage,
      selectedData,
    } = storeToRefs(useRightDataStore());

    const handleExportFile = () => {
      exportFile(mainContentData);
    };

    const {
      dialogVisible: dialogAddFormVisible,
      setDialogVisible: handleAddDialogVisible,
    } = createDialogVisibility();
    const {
      dialogVisible: dialogUpdateFormVisible,
      setDialogVisible: handleUpdateDialogVisible,
    } = createDialogVisibility();
    const {
      dialogVisible: dialogUpdateToSelectedPageFormVisible,
      setDialogVisible: handleUpdateToSelectedPageDialogVisible,
    } = createDialogVisibility();

    const updateToSelectedFormValue = ref<string>("");
    const resetTitleInput = () => {
      form.title = "";
    };

    const formLabelWidth = "140px";
    const form = reactive({
      title: "",
    });

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
    return {
      mainContentData,
      contentTitle,
      resetSearchResult,
      handleRowDelete,
      editMode,
      handleCellEdit,
      handleEditMode,
      handleAddNewData,
      exportFile,
      handleUpdateData,
      currentEditCell,
      buttonContent,
      handleShowData,
      currentPage,
      pageSize,
      loading,
      formLabelWidth,
      dialogAddFormVisible,
      dialogUpdateFormVisible,
      form,
      handleSelectedData,
      resetTitleInput,
      handleAddDialogVisible,
      handleUpdateDialogVisible,
      currentSelectedDataId,
      updateSelectedData,
      currentSelectedData,
      selectedDataTitle,
      selectedData,
      handleSelectionChange,
      setDataToUpdateSelectDataPage,
      dataUpdateToSelectPage,
      dialogUpdateToSelectedPageFormVisible,
      handleUpdateToSelectedPageDialogVisible,
      updateToSelectedFormValue,
      updateToSelectedPageData,
      targetUpdateDataId,
      findId,
      shouldDisableButton,
      batchDelete,
      handleExportFile,
    };
  },
};
</script>
<style scoped>
</style>