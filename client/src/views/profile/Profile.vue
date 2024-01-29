<template>
    <div class="fixed top-[64px] px-60 pt-10 pb-40 z-50 h-[100vh] w-[100vw] bg-red-100 halfDarkBg overflow-auto ">
        <h1 class="text-2xl mb-4">Public profile</h1>
        <hr class="border-t border-gray-500 my-1 w-full">
        <div class="flex">
            <div class="flex flex-col gap-5 w-[60%] p-4">
                <div>
                    <p>Name</p>
                    <el-input class="profile mb-1" />
                    <p class="text-xs">Your name may appear around GitHub where you contribute or are mentioned. You can
                        remove it at any time</p>
                </div>
                <div>
                    <p>E-mail</p>
                    <el-input class="profile mb-1" />
                    <p class="text-xs">You have set your email address to private. To toggle email privacy, go to email
                        settings and uncheck "Keep my email address private."</p>
                </div>
                <div>
                    <p>Bio</p>
                    <el-input class="profile bio mb-1" />
                    <p class="text-xs">You can @mention other users and organizations to link to them.</p>
                </div>

            </div>

            <div class="w-[40%] p-4">
                <h1 class="text-2xl mb-4">Profile Picture</h1>
                <el-image class="rounded-full w-[200px] h-[200px]" :src="photo" lazy />
                <div class="flex justify-center items-center w-[100%]">
                    <el-upload :on-change="handleChange" :auto-upload="false" :show-file-list="false">
                        <template #trigger>
                            <el-button :size="'small'" class="text-2xs" type="info" plain>update</el-button>
                        </template>
                    </el-upload>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUserDataStore } from "@/store"
import { uploadImageToStorage, getPhoto, updateUserPhoto } from "@/firebase/firebase.utils";
const { isLogin, userChoosePhotoURL } = storeToRefs(useUserDataStore())
const { setUserChoosePhotoURL } = useUserDataStore()

const handleChange = async (uploadFile: any, _uploadFiles: any) => {
    console.log(uploadFile.raw, isLogin?.value?.uid, "確認")
    let targetUserUid = isLogin?.value?.uid
    if (targetUserUid) {
        try {
            let fileName: string | undefined = await uploadImageToStorage(uploadFile.raw, targetUserUid)
            if (fileName !== undefined) {
                let newPhotoURL = await getPhoto(targetUserUid, fileName)
                setUserChoosePhotoURL(newPhotoURL)
                await updateUserPhoto(targetUserUid, newPhotoURL)
                console.log(newPhotoURL)
            }
        } catch (error) {
            console.error(error);
        }
    }
}
let photo = ref(userChoosePhotoURL || (isLogin ? isLogin?.value?.photoURL : null))

watch(userChoosePhotoURL, (newVal) => {
    photo.value = newVal
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