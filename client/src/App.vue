<template>
  <div class="bg-red-100 ">
    <Top />
    <Middle />
  </div>
</template>

<script lang="ts">
import Middle from "./components/Middle.vue";
import Top from "./components/Top.vue";
export default { name: "Home", components: { Middle, Top } };
</script>
