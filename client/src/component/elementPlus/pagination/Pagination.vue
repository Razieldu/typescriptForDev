<template>
    <div class="flex justify-center pt-3 pb-2 ">
        <el-pagination class="bg-transparent infoBg" :layout="layout" :total="total" :page-sizes="pageSizes"
            v-model:current-page="curPage" v-model:page-size="pageSize" v-model:background="ifUseBg"
            v-model:small="handleModelSize" v-model:hideOnSinglePage="handleHideOnSinglePage" />
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    page: { type: Number, default: 1 },
    size: { type: Number, default: 10 },
    total: { type: Number, default: 100 },
    layout: { type: String, default: 'total, sizes, prev, pager, next, jumper' },
    pageSizes: {
        type: Array,
        default: () => [10, 20, 30, 40]
    },
    background: { type: Boolean, default: true },
    small: { type: Boolean, default: false },
    hideOnSinglePage: { type: Boolean, default: false }
})
const emit = defineEmits(['update:size', 'update:page', 'update:Bg', 'update:modelSize', 'update:hideOnSinglePage'])
const pageSize = computed({
    get: () => props.size,
    set: (val) => {
        emit('update:size', val)
    }
})
const curPage = computed({
    get: () => props.page,
    set: (val) => {
        emit('update:page', val)
    }
})

const ifUseBg = computed({
    get: () => props.background,
    set: (val) => {
        emit('update:Bg', val)
    }
})

const handleModelSize = computed({
    get: () => props.small,
    set: (val) => {
        emit('update:modelSize', val)
    }
})

const handleHideOnSinglePage = computed({
    get: () => props.hideOnSinglePage,
    set: (val) => {
        emit('update:hideOnSinglePage', val)
    }
})
</script>




