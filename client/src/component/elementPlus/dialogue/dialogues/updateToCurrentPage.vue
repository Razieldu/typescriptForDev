<template>
    <div>
        <el-form :model="form">
            <el-form-item :label="$t('basic.right.updateCurrentPageLabel')" :label-width="formLabelWidth">
                <el-input v-model="selectedDataTitle" autocomplete="off" />
            </el-form-item>
        </el-form>
        <div class="flex justify-end mt-10">
            <span class="dialog-footer">
                <el-button @click="closeDialog">
                    {{ $t("basic.right.cancel") }}</el-button>
                <el-button
                    @click="processMsg(updateSelectedData, t, currentSelectedDataId, closeDialog, selectedDataTitle)">
                    {{ $t("basic.right.confirm") }}
                </el-button>
            </span>
        </div>
    </div>
</template>
<script setup lang="ts">

import { computeFn } from "@/utils";
import { useRightDataStore } from "@/store";
import { processMsg } from "@/utils"


const { t } = useI18n();
let { selectedDataTitle } = computeFn();

const formLabelWidth = "180px";
const form = ref({
    title: "",
});
const emit = defineEmits(["close"])

const {
    updateSelectedData,
} = useRightDataStore();
const {
    currentSelectedDataId,
} = storeToRefs(useRightDataStore());
const closeDialog = () => {
    emit("close", 0)
}

</script>