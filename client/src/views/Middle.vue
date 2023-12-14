<template>
    <div class=" fixed flex bg-red-100 top-[64px] z-50">
      <LeftMenu/>
      <Right/>
    </div>
  </template>
  
  <script lang="ts" setup>
  import LeftMenu from "@/views/LeftMenu.vue";
  import Right from "@/views/Right.vue";
  </script>
  