<template>
  <div class="bg-red-100 h-[100vh] w-[100vw] ">
    <Top />
    <!-- <Middle /> -->
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Middle from "./Middle.vue";
import Top from "./Top.vue";
export default { name: "App", components: { Middle, Top } };
</script>
