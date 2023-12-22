<template>
    <div>
        <el-form :model="form">
            <el-form-item :label="$t('basic.right.newPageLabel')" :label-width="formLabelWidth">
                <el-input v-model="form.title" autocomplete="off"
                    :placeholder="$t('basic.right.enterNewPageTitlePlaceholer')" />
            </el-form-item>
        </el-form>
        <div class="flex justify-end mt-10">
            <span class="dialog-footer">
                <el-button @click="closeDialog()">
                    {{ $t("basic.right.cancel") }}</el-button>
                <el-button type="primary" @click="processMsg(handleSelectedData, t, form.title, closeDialog, resetTitleInput)
                    ">
                    {{ $t("basic.right.confirm") }}
                </el-button>
            </span>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { useRightDataStore } from "@/store";
import { processMsg} from "@/utils"

const { t } = useI18n();

const { handleSelectedData,
} = useRightDataStore();

const form = ref({
    title: "",
});
const resetTitleInput = () => {
    form.value.title = "";
};
const formLabelWidth = "180px";
const props = defineProps(["id"])
console.log(props.id, "props")
const emit = defineEmits(["close"])
const closeDialog = () => {
    emit("close", 0)
}

</script>
  
 