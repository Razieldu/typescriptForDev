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
                <el-image :zoom-rate="1.2" :max-scale="7" :min-scale="0.2" :preview-src-list="srcList"
                    :switch="console.log('hello')" class="rounded-full w-[200px] h-[200px]" :src=" photo.value " lazy />
                <div class="flex justify-center items-center w-[100%]">
                    <el-upload :on-change=" handleUpdatePhoto " :auto-upload=" false" :show-file-list=" false">
                        <template #trigger>
                            <el-button :size=" 'small'" class="uploadButton text-2xs" type="info" plain>update</el-button>
                        </template>
                    </el-upload>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUserDataStore } from "@/store"
import { uploadImageToStorage, getPhotoLocationURL, updateUserChoosePhotoInfo } from "@/firebase/firebase.utils";
const { isLogin, currentPhotoURL, userChoosePhotoFileName, list } = storeToRefs(useUserDataStore())
const { setCurrentPhotoURL } = useUserDataStore()

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
                console.log(newPhotoURL)
            }
        } catch (error) {
            console.error(error);
        }
    }
}
const photo = computed(() => {
    return currentPhotoURL
});

const srcList = computed(() => {
    return list.value
})


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