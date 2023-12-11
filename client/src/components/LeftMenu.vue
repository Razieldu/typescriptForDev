<template>
  <div class="bg-red-100 h-screen w-[22vw]">
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
              <span>{{ $t("basic.left.title.savedPage") }}</span>
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
              <span>{{ $t("basic.left.title.titleSearch") }}</span>
            </template>
            <el-sub-menu
              v-for="(eachObject, titleIndex) in titles"
              :index="eachObject.index"
              :key="titleIndex"
            >
              <template #title>{{ $t(eachObject.name) }}</template>
              <div class="flex justify-center items-center h-[56px]">
                <el-input
                  :key="titleIndex"
                  v-model="inputValue[titleIndex]"
                  class="addInput"
                  v-if="menuButtonStateValue[titleIndex]"
                ></el-input>
                <el-button
                  @click="
                    handleAddSearchTitle(titleIndex, inputValue[titleIndex]);
                    menuButtonStateValue[titleIndex] =
                      !menuButtonStateValue[titleIndex];

                    inputValue[titleIndex] = '';
                  "
                  class="addButton"
                  type="danger"
                  size="small"
                  >{{
                    menuButtonStateValue[titleIndex]
                      ? $t(addButtonContentValue[1])
                      : $t(addButtonContentValue[0])
                  }}
                </el-button>
              </div>
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
                    <p class="text-s">{{ eachSearchWordObject.name }}</p>
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
import { Title } from "../typescriptDefine/type";
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
      { name: "basic.left.menu.name", color: "grey", index: "1-1" },
      { name: "basic.left.menu.email", color: "silver", index: "1-2" },
      { name: "basic.left.menu.company", color: "grey", index: "1-3" },
      { name: "basic.left.menu.jobTitle", color: "silver", index: "1-4" },
      { name: "basic.left.menu.zip", color: "grey", index: "1-5" },
      { name: "basic.left.menu.address", color: "silver", index: "1-6" },
    ]);
    const inputValueArray: Ref<string[]> = ref([]);
    const menuButtonState: Ref<boolean[]> = ref([]);
    const inputValue = inputValueArray.value;
    const titleData = titles.value;
    const menuButtonStateValue = menuButtonState.value;
    const handleOpen = (key: string, keyPath: string) => {
      console.log(`Menu with key ${key} Path${keyPath} is opened!`);
    };
    const handleClose = (key: string, keyPath: string) => {
      console.log(`Menu with key ${key} Path${keyPath} is opened!`);
    };
    // const myElements = ref({});
    const addButtonContent = ref([
      "basic.left.menu.addButton",
      "basic.left.menu.confirmAddButton",
    ]);
    const addButtonContentValue = addButtonContent.value;
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
        menuButtonStateValue.push(false);
        inputValue.push("");
      }
      // console.log(inputValue);
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
      addButtonContentValue,
      addButtonContent,
      menuButtonStateValue,
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
  right: 12px;
  position: absolute;
}
</style>



