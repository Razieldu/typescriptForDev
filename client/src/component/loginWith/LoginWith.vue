<template>
    <div class="mt-1 font-bold grid  grid-rows-2 gap-2">
        <div class="flex items-center justify-center">
            <hr class="border-t border-gray-200 my-1 w-[90%]">
        </div>
        <div class="flex bg-white w-[336px] h-[35px] cursor-pointer rounded-lg text-white loginDivGandF hover:bg-gray-200 relative googleLoginArea "
            @click="signInWithGooglePopup(t)">
            <Image class="w-[25px] h-[30px] absolute left-1" :src="'google'" :fit="'fill'" />
            <div class="flex justify-center items-center w-[336px] h-[35px] absolute text-black">
                <p class="text-sm ">{{ $t(useType?.gmail) }}</p>
            </div>
        </div>
        <!-- <div class="flex bg-gray-400/90 w-[336px] h-[35px] cursor-pointer rounded-lg text-white loginDivGandF hover:bg-gray-200 relative"
            @click="signInWithGithubPopup">
            <Image class="w-[25px] h-[25px] absolute left-1" :src="'github'" :fit="'fill'" />
            <div class="flex justify-center items-center w-[336px] h-[35px] absolute">
                <p class="text-sm ">{{ $t(useType?.github) }}</p>
            </div>
        </div> -->
        <!-- <div class="flex bg-blue-400/90 w-[336px] h-[35px] cursor-pointer rounded-lg text-white loginDivGandF hover:bg-blue-200 relative"
            @click="signInWithGithubPopup">
            <Image  class="w-[25px] h-[25px] absolute left-1" :src="'facebook'" :fit="'fill'" />
            <div class="flex justify-center items-center w-[336px] h-[35px] absolute">
                <p class="text-sm ">{{ $t(useType?.facebook) }}</p>
            </div>
        </div> -->
    </div>
</template>

<script setup  lang="ts">
import Image from "@/component/elementPlus/image/Image.vue";
// import { signInWithGooglePopup, signInWithGithubPopup } from "@/firebase/firebase.utils"
import { signInWithGooglePopup } from "@/firebase/firebase.utils"
const props = defineProps({
    loginOrSignUp: { type: String }
})

const { t } = useI18n()

const useType = computed(() => {
    switch (props.loginOrSignUp) {
        case "login":
            return { gmail: "basic.login.gmailLogin", github: "basic.login.githubLogin", facebook: "basic.login.facebookLogin" }
        case "signup":
            return { gmail: "basic.signUp.gmailSignUp", github: "basic.signUp.githubSignUp", facebook: "basic.signUp.facebookSignUp" }
        default:
            return { gmail: "", github: "", facebook: "" }
    }
});
</script>
<style>
div.googleLoginArea {
    border: 1px solid var(--el-border-color);

}
</style>