<template>
    <el-table class="darkBg" v-loading="props.loadingToTable" highlight-current-row stripe :data="props.dataToTable"
        style="height: 76vh; width: 80vw" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column :key="'姓名'" :label="$t('basic.right.title.name')" :prop="$t('basic.right.title.name')" width="120"
            fixed>
            <template #default="{ row, $index }">
                <div v-if="currentEditCell[0] === '姓名' && currentEditCell[1] === $index
                    ">
                    <el-input ref="cellInput" v-model="row['姓名']"
                        :placeholder="`${$t('basic.right.title.pleaseEnter')} ${$t('basic.right.title.name')}`"
                        @blur="currentEditCell = []" @change="handleUpdateData(row)" />
                </div>
                <div v-else @click="handleCellEdit('姓名', $index)">
                    {{ row["姓名"] || $t("basic.right.title.noName") }}
                </div>
            </template>
        </el-table-column>
        <el-table-column v-for="eachObj in contentTitle" :key="(eachObj.key)" :label="$t(eachObj.title)"
            :prop="$t(eachObj.title)" :width="eachObj.title === 'basic.right.title.email' ? 250 : 150">
            <template #default="{ row, $index }">
                <div v-if="currentEditCell[0] === eachObj.key &&
                    currentEditCell[1] === $index
                    ">
                    <el-input ref="cellInput" v-model="row[eachObj.key]"
                        :placeholder="`${$t('basic.right.title.pleaseEnter')} ${$t(eachObj.title)}`"
                        @blur="currentEditCell = []" @change="handleUpdateData(row)" />
                </div>
                <div v-else @click="handleCellEdit(eachObj.key, $index)">
                    {{ row[eachObj.key] || $t("basic.right.title.noName") }}
                </div>
            </template>
        </el-table-column>
        <el-table-column fixed="right" :label="$t('basic.right.title.operation')" width="150">
            <template #default="scope">
                <el-button size="small" @click="handleEditMode">{{
                    $t(buttonContent)
                }}</el-button>
                <el-button size="small" type="danger" @click="handleRowDelete(scope.row.m_id, currentSelectedDataId)">
                    {{ $t("basic.right.deleteMode") }}</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup lang="ts">
import { ContentTitleItem } from "@/types";
import { rowEditFunction } from "@/utils";
import { useRightDataStore } from "@/store";

const contentTitle: Ref<ContentTitleItem[]> = ref([
    { title: "basic.right.title.email", key: "Email" },
    { title: "basic.right.title.company", key: "服務單位" },
    { title: "basic.right.title.jobTitle", key: "職稱" },
    { title: "basic.right.title.zip", key: "郵遞區號" },
    { title: "basic.right.title.address", key: "地址" },
    { title: "basic.right.title.zip2", key: "郵遞區號2" },
    { title: "basic.right.title.address2", key: "地址2" },
    { title: "basic.right.title.tel_company", key: "連絡電話_公司" },
    { title: "basic.right.title.tel_secretary", key: "連絡電話_秘書" },
    { title: "basic.right.title.tel_home", key: "連絡電話_住宅" },
    { title: "basic.right.title.phone", key: "連絡電話_手機" },
    { title: "basic.right.title.tel1", key: "連絡電話1" },
    { title: "basic.right.title.tel2", key: "連絡電話2" },
    { title: "basic.right.title.fax", key: "傳真電話" },
    { title: "basic.right.title.fax2", key: "傳真2" },
]);

const props = defineProps(["loadingToTable","dataToTable"])
 
const {
    currentSelectedDataId,
} = storeToRefs(useRightDataStore());

const {
    handleRowDelete,
    handleUpdateData,
} = useRightDataStore();
let {
    currentEditCell,
    buttonContent,
    handleEditMode,
    handleCellEdit,
    handleSelectionChange,
} = rowEditFunction();

</script>