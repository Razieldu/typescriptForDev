<template>
  <div class="relative bg-red-200 h-screen">
    <el-aside
      style="
        height: 70vh;
        width: 18%;
        position: fixed;
        top: 112px;
        padding-left: 10px;
        min-width: 300px;
      "
    >
      <el-scrollbar>
        <el-menu
          style="background-color: #f1f5f9; border-color: #f1f5f9"
          unique-opened
          @open="handleOpen"
          @close="handleClose"
        >
          <el-sub-menu index="2">
            <template #title>
              <el-icon><document /></el-icon>
              <span>已儲存的分類資料</span>
            </template>
            <el-menu-item
              v-for="(eachSelectedData, index) in selectedData"
              :key="index"
              :id="eachSelectedData.id"
              @click="showSelectedData(eachSelectedData.id)"
              :index="`2-${index + 1}`"
            >
              <template #title>{{ eachSelectedData.title }}</template>
            </el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="1">
            <template #title>
              <el-icon><Search /></el-icon>
              <span>標題搜尋</span>
            </template>
            <el-sub-menu
              v-for="(eachObject, titleIndex) in titles"
              :index="eachObject.index"
              :key="titleIndex"
            >
              <template #title>{{ eachObject.name }}</template>
              <el-menu-item>
                <el-input
                  :key="titleIndex"
                  v-model="inputValue[titleIndex]"
                  class="addInput"
                ></el-input>
                <el-button
                  @click="
                    handleAddSearchTitle(
                      titleIndex,
                      inputValue[titleIndex]
                    )
                  "
                  class="addButton"
                  type="danger"
                  size="small"
                  >新增</el-button
                >
              </el-menu-item>
              <el-menu-item
                v-for="(eachSearchWordObject, index) in data[titleIndex]"
                :key="index"
                :index="`1-${index + 1}-${titleIndex + 1}`"
              >
                <div :key="index" class="grid grid-cols-10 place-items-center">
                  <div class="col-span-3 flex justify-center">
                    <el-checkbox
                      v-model="eachSearchWordObject.select"
                      label="關聯"
                      size="small"
                      v-if="!isFirst"
                    />
                  </div>
                  <div
                    class="col-span-6 flex justify-center overflow-hidden min-w-[60%] max-w-[60%] hover:bg-red-100"
                    @click="
                      searchGoalByColumn(
                        titleData[titleIndex].name,
                        eachSearchWordObject.name,
                        eachSearchWordObject.select
                      )
                    "
                  >
                    <p class="text-s">
                      {{ eachSearchWordObject.name }}
                    </p>
                  </div>
                  <div
                    class="deleteButton col-span-1 place-items-center flex justify-center"
                  >
                    <el-button
                      type="danger"
                      :icon="Delete"
                      size="small"
                      circle
                      @click="deleteData(titleIndex, eachSearchWordObject.id)"
                    />
                  </div>
                </div>
              </el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>
  </div>
</template>
  
<script lang="ts">
import { Delete } from "@element-plus/icons-vue";
import { RouterLink } from "vue-router";
import { ref, watch, Ref, onMounted } from "vue";
import { useLeftDataStore } from "../store/LeftDataHandleStore";
import { useRightDataStore } from "../store/DataHandleStore";
import { storeToRefs } from "pinia";
interface Title {
  name: string;
  color: string;
  index: string;
}
// interface InputValue {
//   id: number;
//   value: string;
// }
export default {
  name: "LeftMenu",
  components: {},
  setup() {
    const leftDataStore = useLeftDataStore();
    const DataHandleStore = useRightDataStore();
    const { data, open } = storeToRefs(leftDataStore);
    const { deleteData, handleAddSearchTitle } = leftDataStore;
    const { searchGoalByColumn, showSelectedData } = DataHandleStore;
    const { selectedData, isFirst } = storeToRefs(DataHandleStore);
    const titles: Ref<Title[]> = ref([
      { name: "姓名", color: "grey", index: "1-1" },
      { name: "Email", color: "silver", index: "1-2" },
      { name: "服務單位", color: "grey", index: "1-3" },
      { name: "職稱", color: "silver", index: "1-4" },
      { name: "郵遞區號", color: "grey", index: "1-5" },
      { name: "地址", color: "silver", index: "1-6" },
    ]);
    const inputValueArray: Ref<string[]> = ref([]);
    const inputValue = inputValueArray.value;
    const titleData = titles.value;
    const handleOpen = (key: string, keyPath: string) => {
      console.log(`Menu with key ${key} Path${keyPath} is opened!`);
    };
    const handleClose = (key: string, keyPath: string) => {
      console.log(`Menu with key ${key} Path${keyPath} is opened!`);
    };
    // const myElements = ref({});
    watch(
      selectedData,
      (newData) => {
        console.log("選單資料更新發動", newData);
        console.log("選單資料更新發動", selectedData);
      },
      { deep: true }
    );

    onMounted(() => {
      for (let i = 0; i < titleData.length; i++) {
        inputValue.push("");
      }
      console.log(inputValue);
    });

    return {
      handleClose,
      RouterLink,
      titles,
      data,
      open,
      deleteData,
      handleOpen,
      searchGoalByColumn,
      titleData,
      selectedData,
      showSelectedData,
      isFirst,
      Delete,
      inputValue,
      handleAddSearchTitle,
      // myElements,
    };
  },
};
</script>
<style scope>
.deleteButton .el-icon svg {
  height: 0.8rem !important;
  width: 0.8rem !important;
}
.deleteButton .el-icon {
  margin-right: 0px !important;
}
.addButton {
  height: 24px !important;
  right: 18px;
  position: absolute;
}
.addInput {
  height: 24px;
  width: 150px !important;
  /* margin-right: 12px; */
  right: 12px;

  position: absolute;
}
</style>



