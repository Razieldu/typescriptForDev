<template>
    <div
      class="flex items-center py-6 px-0 fixed top-0 w-full h-16 bg-sky-600 z-50"
    >
      <div class="ml-10 flex items-center gap-0">
        <el-input v-model="inputValue"  placeholder="請輸入..." />
        <el-button @click="fuzzySearch(inputValue)" class="ml-3" type="primary">搜尋</el-button>
        <div class="absolute right-5">
          <el-button type="primary">登出</el-button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import{ref} from "vue"
  import { useRightDataStore } from "../store/DataHandleStore";
  export default {
    components: {},
    setup(){
      const inputValue = ref("")
      const rightDataStore = useRightDataStore();
      const {
        fuzzySearch
      } = rightDataStore
  
      return{
        inputValue,
        fuzzySearch,}
    }
  };
  </script>
  
  