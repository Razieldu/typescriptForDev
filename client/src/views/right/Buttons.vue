<template>
    <div>
        <div class="pl-1 py-2 flex">
            <el-button @click="resetSearchResult()" type="primary">
                {{ $t("basic.right.mainPage") }}
            </el-button>
            <el-button @click="  if (isLogin) {
                handleAddNewData(isLogin?.uid)
            };
                " type="primary">{{
            $t("basic.right.addNewData")
    }}</el-button>
            <el-button @click="handleExportFile" type="primary">Excel</el-button>
            <el-button @click="openDialog('AddNewPage')" type="primary">{{
                    $t("basic.right.buildPage")
            }}</el-button>
            <el-button @click="openDialog('AddTargetPage')" type="primary" :disabled="shouldDisableButton">
                {{ $t("basic.right.addToPage") }}
            </el-button>
            <el-button type="primary" @click="batchDelete(currentSelectedDataId, dataUpdateToSelectPage)">
                {{ $t("basic.right.deleteMany") }}
            </el-button>
            <el-button v-if="currentSelectedDataId !== ''" @click="openDialog('UpdateToCurrentPage')" type="primary">
                {{ $t("basic.right.updatePage") }}
            </el-button>
            <el-button @click="openDialog('UploadFile')" type="primary">{{ $t("basic.right.upload") }}</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { exportFile } from "@/utils";
import { useRightDataStore, useUserDataStore } from "@/store";
import { addDialog } from "@/component/elementPlus/dialogue/index"
import { computeFn } from "@/utils";
import addNewPage from "@/component/elementPlus/dialogue/dialogues/addNewPage.vue"
import updateToCurrentPage from "@/component/elementPlus/dialogue/dialogues/updateToCurrentPage.vue";
import addToTargetPage from "@/component/elementPlus/dialogue/dialogues/addToTargetPage.vue";
import uploadFile from "@/component/elementPlus/dialogue/dialogues/upload.vue"

const { t } = useI18n()
const {
    data,
    currentSelectedDataId,
    dataUpdateToSelectPage,
} = storeToRefs(useRightDataStore());

const { isLogin } = useUserDataStore()

let { shouldDisableButton } = computeFn();
const {
    resetSearchResult,
    handleAddNewData,
    batchDelete,
} = useRightDataStore();

const handleExportFile = () => {
    exportFile(data);
};
const openDialog = (target: string) => {
    const componentSwitch = (target: string) => {
        switch (target) {
            case "AddNewPage":
                return { content: addNewPage, title: t('basic.right.newPageTitle'), id: target + '1' }
            case "AddTargetPage":
                return { content: addToTargetPage, title: t('basic.right.addToTargetPageTitle'), id: target + "2" }
            case "UpdateToCurrentPage":
                return { content: updateToCurrentPage, title: t('basic.right.updateCurrentPageTitle'), id: target + "3" }
            case "UploadFile":
                return { content: uploadFile, title: t('basic.right.importPageTitle'), id: target + "4" }

            default:
                return null
        }
    }
    let targetItem = componentSwitch(target)
    if (targetItem) {
        addDialog({
            title: targetItem?.title,
            width: "700px",
            props: {
                id: targetItem.id
            },
            component: markRaw(targetItem?.content),
            callBack: (data: any) => {
                //当弹窗任务结束后，调用父页面的回掉函数。（比如我新增完成了需要刷新列表页面）
                console.log("回调函数", data)
            }
        })
    }
}

</script>