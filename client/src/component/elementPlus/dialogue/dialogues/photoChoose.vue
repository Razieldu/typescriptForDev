<template>
    <div class="">
        <div class="flex flex-row  flex-wrap justify-between items-center max-h-[300px] overflow-auto " v-if="list.length > 0">
            <div class="cursor-pointer w-[150px] h-[150px] mb-3 group relative" v-for="(url, index) in list" :key="index" >
                  <el-image class="w-[150px] h-[150px]  group-hover:bg-gray-300"  :fit="'scale-down'" :src="url" @click="chooseCurrentPhoto(url)" />
                    <el-button class="absolute bottom-0 right-0 group-hover" @click="handleDeletePhoto(url)" :size="'small'" type="danger" :icon="Delete" circle />
                  </div>
        </div>
        <div class="flex justify-end mt-10">
            <span class="dialog-footer">
                <el-button @click="closeDialog">取消</el-button>
                <el-button type="primary" @click="closeDialog">確認</el-button>
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Delete } from '@element-plus/icons-vue'
import { useUserDataStore } from "@/store"
import { updateUserChoosePhotoInfo, deletePhoto } from "@/firebase/firebase.utils";
const { setCurrentPhotoURL, setUserChoosePhotoName, setUserChoosePhotoList } = useUserDataStore()
const { isLogin, currentPhotoURL, userChoosePhotoFileName, list } = storeToRefs(useUserDataStore())
const props = defineProps(["id"])
console.log(props.id, "props")
const emit = defineEmits(["close"])
const closeDialog = () => {
    emit("close", 0)
}
const chooseCurrentPhoto = async (URL: string) => {
    setCurrentPhotoURL(URL)
    let targetUserUid = isLogin?.value?.uid
    if (targetUserUid) {
        const extractedNumber1 = currentPhotoURL.value.split("%2F")
        const extractedNumber2 = extractedNumber1[extractedNumber1.length - 1].split("?")
        setUserChoosePhotoName(extractedNumber2[0])
        await updateUserChoosePhotoInfo(targetUserUid, currentPhotoURL.value, userChoosePhotoFileName.value)
        console.log(extractedNumber2[0]); // 输出：20240202142530
    }
    console.log(URL)
}

const handleDeletePhoto = async (url: string) => {
    let targetUserUid = isLogin?.value?.uid
    if (targetUserUid) {
        const extractedNumber1 = url.split("%2F")
        const extractedNumber2 = extractedNumber1[extractedNumber1.length - 1].split("?")
        let fileName = extractedNumber2[0]
        // if (fileName === userChoosePhotoFileName.value) return
        let tempList = [...list.value]
        let filterdList = tempList.filter(eachUrl => eachUrl !== url)
        if (filterdList.length === 0) {
            setUserChoosePhotoName("")
            await updateUserChoosePhotoInfo(targetUserUid, "", "")
        }
        setUserChoosePhotoList(filterdList)
        await deletePhoto(targetUserUid, fileName)
    }
}

watch(list, (newVal) => {
    console.log(newVal)
})
</script>

