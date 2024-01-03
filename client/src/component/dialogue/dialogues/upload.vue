<template>
    <div>
        <el-form :model="form">
            <el-form-item :label="'建立分頁名稱'" :label-width="formLabelWidth">
                <el-input v-model="form.title" autocomplete="off" />
            </el-form-item>
        </el-form>
        <el-upload class="upload-demo" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :limit="1"
            :on-change="handleChange" :auto-upload="false" accept=".xls,.xlsx" ref="uploadRef">
            <el-button plain icon="Download">點擊上傳</el-button>
        </el-upload>
        <div class="flex justify-end mt-10">
            <el-button @click="closeDialog">取消</el-button>
            <el-button type="primary" @click="buildNewPage(insertNewPageData, form.title, resetTitleInput, closeDialog)
">確認</el-button>
        </div>
    </div>
</template>
​
<script lang="ts" setup>
import type { UploadInstance } from 'element-plus'
import { useRightDataStore } from "@/store";
import { importExcel } from "../../../utils/importExcel/index"
// import { processMsg } from "@/utils"

// const { t } = useI18n();

const emit = defineEmits(["close"])
const closeDialog = () => {
    emit("close", 0)
}

const formLabelWidth = "120px";
const form = ref({
    title: "",
});
const resetTitleInput = () => {
    form.value.title = "";
};

const { buildNewPage,
} = useRightDataStore();


 


const uploadRef = ref<UploadInstance>()

// 导入参数的初始值
let fileRaw = ref();
// 用来将数据赋值 传到confirm确认按钮 -- 形参
let uploadFileList = ref();
// 选中文件后把参数赋值
let insertNewPageData = ref([])

const handleChange = (uploadFile: any, uploadFiles: any) => {
    // 设置初始值
    fileRaw.value = null;
    // 遍历数组的值
    for (let i of uploadFiles) {
        if (i.raw) {
            // 将文件列表添加到数组
            fileRaw.value = i.raw;
            break; // 如果只允许上传一个文件，可以加上 break
        }
    }
    // 这个变量uploadFileList用来给确认按钮当形参
    uploadFileList.value = uploadFile;
    console.log('uploadFileList:', uploadFileList.value);
    let excelData = importExcel(fileRaw)
    console.log(excelData)
    if (excelData) {
        insertNewPageData.value = excelData
        console.log(insertNewPageData)
    }
};





</script>






