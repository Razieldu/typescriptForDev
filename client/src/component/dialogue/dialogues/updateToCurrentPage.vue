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
                <el-button @click="
                    updateSelectedData(
                        currentSelectedDataId,
                        closeDialog,
                        selectedDataTitle
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
import { storeToRefs } from "pinia";
import { computeFn } from "@/utils";
import { useRightDataStore } from "@/store";
let { selectedDataTitle } = computeFn();

const formLabelWidth = "100px";
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