<template>
    <div class=" fixed flex bg-red-100 top-[64px] z-50">
      <!-- <router-view/>  -->
      <LeftMenu/>
      <Right/>
    </div>
  </template>
  
  <script lang="ts">
  import LeftMenu from "./LeftMenu.vue";
  import Right from "./Right.vue";
  export default {
    components: {
      Right,
      LeftMenu
    },
  };
  </script>
  