<template>
  <div class="ml-custom text-base bg-red-100 py-0 fixed">
    <div>
      <div class="pl-1 py-2 flex">
        <el-button @click="resetSearchResult()" type="primary"
          >主資料頁面</el-button
        >
        <el-button @click="handleAddNewData()" type="primary">新增</el-button>
        <el-button @click="exportFile()" type="primary">Export</el-button>
        <el-button @click="dialogAddFormVisible = true" type="primary"
          >建立資料分頁</el-button
        >
        <el-button
          v-if="currentSelectedDataId !== ''"
          @click="dialogUpdateFormVisible = true"
          type="primary"
          >更新資料分頁</el-button
        >
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
          <el-button size="small" @click="handleEditMode">{{
            buttonContent
          }}</el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleRowDelete(scope.row.m_id, currentSelectedDataId)"
            >刪除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="flex justify-center pt-5 pb-1">
      <el-pagination
        class="bg-transparent"
        @size-change="handlePageSizeChange"
        @current-change="handleCurrentChange"
        @prev-click="handlePrevClick"
        @next-click="handleNextClick"
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
      title="建立新分頁標題名稱"
    >
      <el-form :model="form">
        <el-form-item label="標題名稱" :label-width="formLabelWidth">
          <el-input
            v-model="form.title"
            autocomplete="off"
            placeholder="請輸入..."
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleAddDialogVisible(false)">取消</el-button>
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
            確認
          </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      v-if="currentSelectedDataId !== ''"
      class="fixed top-20"
      v-model="dialogUpdateFormVisible"
      title="更新目前分頁"
    >
      <el-form :model="form">
        <el-form-item label="標題名稱" :label-width="formLabelWidth">
          <el-input v-model="selectedDataTitle" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleUpdateDialogVisible(false)">取消</el-button>
          <el-button
            @click="
              updateSelectedData(
                currentSelectedDataId,
                handleUpdateDialogVisible,
                selectedDataTitle
              )
            "
          >
            確認
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, watch, reactive, Ref, computed } from "vue";
import { useRightDataStore } from "../store/DataHandleStore";
import { storeToRefs } from "pinia";
import { utils, writeFileXLSX } from "xlsx";
import { DataItem } from "../store/DataHandleStore";
// import { ElTable } from 'element-plus'
interface ContentTitleItem {
  title: string;
  key: string;
}

export default {
  setup() {
    const selectedDataTitle = computed({
      get: () => currentSelectedData.value?.title || "",
      set: (value) => {
        if (currentSelectedData.value) {
          currentSelectedData.value.title = value;
        }
      },
    });
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
    const editMode: Ref<boolean> = ref(false);
    const currentEditCell: Ref<(string | number)[]> = ref([]);
    const buttonContent: Ref<string> = ref("修改");
    const {
      fetchData,
      resetSearchResult,
      handleRowDelete,
      handleAddNewData,
      handleUpdateData,
      handleSelectedData,
      updateSelectedData,
    } = useRightDataStore();
    const { data, currentSelectedDataId, currentSelectedData } = storeToRefs(
      useRightDataStore()
    );
    const handleCellEdit = (colKey: string, rowIndex: number) => {
      if (!editMode.value) return;
      currentEditCell.value = [colKey, rowIndex];
      // console.log(currentEditCell.value);
    };
    const handleEditMode = () => {
      let oldValue = editMode.value;
      editMode.value = !oldValue;
      if (editMode.value === false) {
        currentEditCell.value = [];
        buttonContent.value = "修改";
      } else {
        buttonContent.value = "儲存";
      }
      // console.log(editMode.value);
    };
    const exportFile = () => {
      // console.log(mainContentData.value);
      let deleteM_idData = mainContentData.value.map(
        ({ m_id, ...rest }) => rest
      );
      const ws = utils.json_to_sheet(deleteM_idData);
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, "Data");
      const sheetData: any[] = utils.sheet_to_json(ws, { header: 1 });
      const columnCount: number = sheetData[0].length;

      for (let col = 0; col < columnCount; col++) {
        // const columnName = utils.encode_col(col);
        const columnWidth = 30;
        ws["!cols"] = ws["!cols"] || [];
        ws["!cols"][col] = { wch: columnWidth };
      }

      writeFileXLSX(wb, `會員資料_${new Date().toLocaleString()}.xlsx`);
    };
    const currentPage = ref(1);
    const pageSize = ref(10);
    const handlePageSizeChange = (val: number) => {
      pageSize.value = val;
    };
    const handleCurrentChange = (val: number) => {
      currentPage.value = val;
    };
    const handlePrevClick = (val: number) => {
      currentPage.value = val - 1;
    };
    const handleNextClick = (val: number) => {
      currentPage.value = val + 1;
    };
    const handleShowData = (
      currentPage: number,
      pageSize: number,
      data: DataItem[]
    ) => {
      console.log(data);
      let pageStartIndex = (currentPage - 1) * pageSize;
      let pageEndIndex = currentPage * pageSize;
      let showData = data.slice(pageStartIndex, pageEndIndex);
      return showData;
    };
    const loading = ref(true);
    // const multipleTableRef = ref<InstanceType<typeof ElTable>>();
    const multipleSelection = ref<DataItem[]>([]);
    // const toggleSelection = (rows?: DataItem[]) => {
    //   if (rows) {
    //     rows.forEach((row) => {
    //       // TODO: improvement typing when refactor table
    //       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //      multipleTableRef.value!.toggleRowSelection(row, undefined);
    //     });
    //   } else {
    //     multipleTableRef.value!.clearSelection();
    //   }
    // };
    const handleSelectionChange = (val: DataItem[]) => {
      multipleSelection.value = val;
      console.log(val)
    };

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

    const dialogAddFormVisible = ref(false);
    const handleAddDialogVisible = (ifVisible: boolean) => {
      dialogAddFormVisible.value = ifVisible;
    };
    const dialogUpdateFormVisible = ref(false);
    const handleUpdateDialogVisible = (ifVisible: boolean) => {
      dialogUpdateFormVisible.value = ifVisible;
    };
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
      handlePageSizeChange,
      handleCurrentChange,
      handlePrevClick,
      handleNextClick,
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
      handleSelectionChange,
      // toggleSelection
    };
  },
};
</script>
<style scoped>
</style>