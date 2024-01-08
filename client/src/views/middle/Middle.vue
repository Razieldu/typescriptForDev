<template>
  <div class=" fixed flex bg-red-100 top-[64px] z-50 halfDarkBg">
    <LeftMenu />
    <Right />
  </div>
</template>
  
<script lang="ts" setup>
import LeftMenu from "@/views/leftMenu/LeftMenu.vue";
import Right from "@/views/right/Right.vue";
</script>
  