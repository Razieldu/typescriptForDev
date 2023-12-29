<template>
    <div class="flex justify-center pt-3 pb-2 ">
        <el-pagination 
        class="bg-transparent infoBg" 
        v-model:current-page="curPage" 
        v-model:page-size="pageSize"
        :layout="layout" :total="total" 
        :page-sizes="pageSizes" 
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange" 
        small 
        />
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
    }
})
const emit = defineEmits(['update:size', 'update:page', 'pagination'])
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

function handleSizeChange() {
    emit('pagination')
}

function handleCurrentChange() {
    emit('pagination')
}
</script>