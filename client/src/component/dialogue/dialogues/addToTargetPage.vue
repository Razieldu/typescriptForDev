<template>
    <div>
        <el-form :model="form">
            <el-form-item :label="$t('basic.right.addToTargetPageLabel')" :label-width="formLabelWidth">
                <el-select v-model="updateToSelectedFormValue" filterable allow-create default-first-option
                    :reserve-keyword="false" :placeholder="$t('basic.right.selectTargetPageTitle')">
                    <el-option v-for="item in selectedData" :key="item.id" :label="item.title" :value="item.title" />
                </el-select>
            </el-form-item>
        </el-form>
        <div class="flex justify-end mt-10">
            <span class="dialog-footer">
                <el-button @click="closeDialog">
                    {{ $t("basic.right.cancel") }}</el-button>
                <el-button @click="
                    updateToSelectedPageData(
                        findId(updateToSelectedFormValue, selectedData),
                        dataUpdateToSelectPage,
                        closeDialog
                    )
                    ">
                    {{ $t("basic.right.confirm") }}
                </el-button>
            </span>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue"
import { useRightDataStore } from "@/store";
import { storeToRefs } from "pinia";
import { findId } from "@/utils";

const form = ref({
    title: "",
});
const formLabelWidth = "100px";
const updateToSelectedFormValue = ref<string>("");
const {
    dataUpdateToSelectPage,
    selectedData,
} = storeToRefs(useRightDataStore());
const {
    updateToSelectedPageData,
} = useRightDataStore();
const emit = defineEmits(["close"])
const closeDialog = () => {
    emit("close", 0)
}
</script>