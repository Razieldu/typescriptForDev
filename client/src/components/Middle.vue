<template>
    <div class=" relative flex mt-mt18">
   
      <!-- <router-view/>  -->
      <LeftMenu></LeftMenu>
      <Right/>
    </div>
  </template>
  
  <script lang="ts">
  import LeftMenu from "./LeftMenu.vue";
  import Right from "./Right.vue";
  import { RouterView } from "vue-router";
  export default {
    components: {
      RouterView,
      Right,
      LeftMenu
    },
  };
  </script>
  