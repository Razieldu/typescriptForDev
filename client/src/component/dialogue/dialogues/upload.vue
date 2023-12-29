<template>
    <div>
        <el-form :model="form">
            <el-form-item :label="'上傳並建立分頁'" :label-width="formLabelWidth">
                <el-input autocomplete="off" />
            </el-form-item>
        </el-form>
        <el-upload class="upload-demo" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :limit="1"
            :on-change="handleChange" :auto-upload="false" accept=".xls,.xlsx">
            <el-button plain icon="Download">点击上传</el-button>
        </el-upload>
        <!-- upload上传组件占位 -->
        <div class="flex justify-end mt-10">
            <el-button @click="closeDialog">取消</el-button>
            <el-button type="primary" @click="confirm(handleChange, closeDialog)">确认</el-button>
        </div>
    </div>
</template>
​
<script lang="ts" setup>
const emit = defineEmits(["close"])
const closeDialog = () => {
    emit("close", 0)
}

const formLabelWidth = "120px";
const form = ref({
    title: "",
});

// 点击确认按钮/判断/请求逻辑/关闭对话框/清空数据
const confirm = (fn: Function, fn2: Function) => {
    fn()
    fn2()
}

// 导入参数的初始值
let fileRaw = ref();
// 用来将数据赋值 传到confirm确认按钮 -- 形参
let uploadFileList = ref();
// 选中文件后把参数赋值
const handleChange = (uploadFile: any, uploadFiles: any) => {
    // 设置初始值
    fileRaw.value = [];
    // 遍历数组的值
    for (let i of uploadFiles) {
        if (i.raw) {
            // 将文件列表添加到数组
            fileRaw.value.push(i.raw);
        }
    }
    // 这个变量uploadFileList用来给确认按钮当形参
    uploadFileList.value = uploadFile;
    console.log(uploadFileList.value)
};

</script>






