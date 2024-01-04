<template>
    <div>
        <el-form :model="form">
            <el-form-item class="w-[600px]" :label="$t('basic.right.newPageTitle')" :label-width="formLabelWidth">
                <el-input v-model="form.title" autocomplete="off" />
            </el-form-item>
        </el-form>
        <el-upload class="upload-demo h-[70px]" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :limit="1" :on-change="handleChange" :auto-upload="false" accept=".xls,.xlsx">
            <div></div>
            <el-button class="ml-3" plain icon="Download">{{ $t("basic.right.upload") }}</el-button>
        </el-upload>
        <div class="flex justify-end mt-10">
            <el-button @click="closeDialog"> {{ $t("basic.right.cancel") }}</el-button>
            <el-button type="primary" @click="processMsg(buildNewPage, t, insertNewPageData, form.title, closeDialog, resetTitleInput)
                "> {{ $t("basic.right.confirm") }}</el-button>
        </div>
    </div>
</template>
​
<script lang="ts" setup>
import { useRightDataStore } from "@/store";
import { importExcel } from "../../../utils/importExcel/index"
import { processMsg } from "@/utils"

const { t } = useI18n();

const emit = defineEmits(["close"])
const closeDialog = () => {
    emit("close", 0)
}

const formLabelWidth = "200px";
const form = ref({
    title: "",
});
const resetTitleInput = () => {
    form.value.title = "";
};

const { buildNewPage,
} = useRightDataStore();





// const uploadRef = ref<UploadInstance>()

// 导入参数的初始值
let fileRaw = ref();
// 用来将数据赋值 传到confirm确认按钮 -- 形参
let uploadFileList = ref();
// 选中文件后把参数赋值
let insertNewPageData = ref([])

const handleChange = async (uploadFile: any, uploadFiles: any) => {
    fileRaw.value = null;

    for (let i of uploadFiles) {
        if (i.raw) {
            fileRaw.value = i.raw;
            break;
        }
    }

    uploadFileList.value = uploadFile;
    console.log('uploadFileList:', uploadFileList.value);

    try {
        let excelData = await importExcel(fileRaw);
        if (excelData) {
            insertNewPageData.value = excelData;
        }
    } catch (error) {
        console.error('导入 Excel 失败:', error);
    }
};



</script>
<style>
/* .importTitle {
    --el-input-width: 600px !important;
} */
</style>





