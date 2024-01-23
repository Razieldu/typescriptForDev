<template>
    <div class="flex justify-center items-center p-1">
        <el-image :class="class" :src="imageUrl" :fit="fit" />
    </div>
</template>

<script setup lang="ts">
import google from "@/assets/photo/google.png"
import facebook from "@/assets/photo/facebookNew.png"
const props = defineProps({
    class:{type:String},
    fit: { type: String, default: 'fill' },
    src: { type: String }
})
const imageUrl = computed(() => {
    switch (props.src) {
        case "google":
            return google
        case "facebook":
            return facebook
        default:
            return props.src;
    }
});
</script>