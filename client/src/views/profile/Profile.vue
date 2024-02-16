<template>
    <div class="fixed top-[64px] px-60 pt-10 pb-40 z-50 h-[100vh] w-[100vw] bg-red-100 halfDarkBg overflow-auto ">
        <h1 class="text-2xl mb-4 font-bold">Public profile</h1>
        <hr class="border-t border-gray-500 my-1 w-full">
        <div class="flex">
            <div class="flex flex-col gap-5 w-[60%] p-4">
                <div>
                    <p class="font-bold">Name</p>
                    <p class="mt-1 text-xs">user123</p>
                    <el-input class="profile mb-1" />
                    <p class="text-xs mt-3">Your name may appear around GitHub where you contribute or are mentioned. You
                        can remove it at any time</p>
                </div>
                <div>
                    <p class="font-bold">E-mail Verified</p>
                    <p class="text-xs mt-3">Already done</p>
                </div>
                <div>
                    <p class="font-bold">Phone number</p>
                    <p class="mt-1 text-xs">user123</p>
                    <el-input class="profile mb-1" />
                    <p class="text-xs">Your name may appear around GitHub where you contribute or are mentioned. You can
                        remove it at any time</p>
                </div>
                <div>
                    <p class="font-bold">E-mail</p>
                    <p class="mt-1 text-xs">s123@mail.com</p>
                    <el-input class="profile mb-1" />
                    <p class="text-xs">You have set your email address to private. To toggle email privacy, go to email
                        settings and uncheck "Keep my email address private."</p>
                </div>
                <div>
                    <p class="font-bold">Bio</p>
                    <p class="mt-1 text-xs">You have set your email address to private. To toggle email privacy, go to email
                        settings and uncheck "Keep my email address private."You have set your email address to private. To
                        toggle email privacy, go to email
                        settings and uncheck "Keep my email address private."m</p>
                    <el-input class="profile bio mb-1" />
                    <p class="text-xs">You can @mention other users and organizations to link to them.</p>
                </div>
            </div>

            <div class="w-[40%] p-4">
                <h1 class="text-2xl mb-4 font-bold">Profile Picture</h1>
                <el-image :zoom-rate="1.2" :max-scale="7" :min-scale="0.2" :preview-src-list="list"
                    class="rounded-full w-[200px] h-[200px]" :src="currentPhotoURL" />
                <div class="flex justify-center items-center w-[100%]">
                    <el-button @click="handleOpen" :size="'small'" class="uploadButton text-2xs" type="info" plain>預覽所有圖片</el-button>
                    <el-upload :on-change="handleUpdatePhoto" :auto-upload="false" :show-file-list="false">
                        <template #trigger>
                            <el-button :size="'small'" class="uploadButton text-2xs" type="info" plain>update</el-button>
                        </template>
                    </el-upload>
                </div>
            </div>
        </div>
        <Mydialogue/>
    </div>
</template>

<script setup lang="ts">
import { useUserDataStore } from "@/store"
import { uploadImageToStorage, getPhotoLocationURL, updateUserChoosePhotoInfo, listUserChoosePhotoes } from "@/firebase/firebase.utils";
import PhotoChoose from "@/component/elementPlus/dialogue/dialogues/photoChoose.vue"
import Mydialogue from "@/component/elementPlus/dialogue/index.vue"
import { addDialog } from "@/component/elementPlus/dialogue/index"
const { isLogin, currentPhotoURL, userChoosePhotoFileName, list } = storeToRefs(useUserDataStore())
const { setCurrentPhotoURL } = useUserDataStore()

const handleOpen = ()=>{
    addDialog({
            title: '個人圖片預覽',
            width: "700px",
            props: {
                id: "所有圖片預覽5"
            },
            component: markRaw(PhotoChoose),
            callBack: (data: any) => {
                //当弹窗任务结束后，调用父页面的回掉函数。（比如我新增完成了需要刷新列表页面）
                console.log("回调函数", data)
            }
        })
}
const handleUpdatePhoto = async (uploadFile: any, _uploadFiles: any) => {
    console.log(uploadFile.raw, isLogin?.value?.uid, "確認")
    let targetUserUid = isLogin?.value?.uid
    if (targetUserUid) {
        try {
            let fileName: string | undefined = await uploadImageToStorage(uploadFile.raw, targetUserUid)
            if (fileName !== undefined) {
                let newPhotoURL = await getPhotoLocationURL(targetUserUid, fileName)
                setCurrentPhotoURL(newPhotoURL)
                await updateUserChoosePhotoInfo(targetUserUid, newPhotoURL, userChoosePhotoFileName.value)
                await listUserChoosePhotoes(targetUserUid)
                console.log(newPhotoURL)
            }
        } catch (error) {
            console.error(error);
        }
    }
}
</script>
<style>
.el-input.profile {
    margin-top: 4px;
    width: 280px;
}

.el-input.bio {
    height: 150px;
}
</style>