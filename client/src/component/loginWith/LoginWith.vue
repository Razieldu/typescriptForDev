<template>
    <div class="mt-1 font-bold grid  grid-rows-2 gap-2">
        <div class="flex items-center justify-center">
            <hr class="border-t border-gray-200 my-1 w-[90%]">
        </div>
        <div class="grid grid-cols-5 bg-red-400/90 w-[336px] cursor-pointer rounded-lg text-white loginDivGandF hover:bg-red-200"
            @click="signInWithGooglePopup">
            <Image class="w-[25px] h-[25px]  col-span-1" :src="'google'" :fit="'fill'" />
            <div class="flex justify-center items-center col-span-4 relative">
                <p class="absolute left-12 text-sm ">{{ $t("basic.login.gmailLogin") }}</p>
            </div>
        </div>
        <div class="grid grid-cols-5 bg-blue-400/90 w-[336px] cursor-pointer rounded-lg text-white loginDivGandF hover:bg-blue-200"
            @click="signInWithGoogleRedirect">
            <Image class="w-[25px] h-[25px]  col-span-1" :src="'facebook'" :fit="'fill'" />
            <div class="flex justify-center items-center col-span-4 relative">
                <p class="absolute left-12 text-sm ">{{ $t("basic.login.facebookLogin") }}</p>
            </div>
        </div>
    </div>
</template>

<script setup  lang="ts">
import Image from "@/component/elementPlus/image/Image.vue";
import { signInWithGooglePopup, signInWithGoogleRedirect } from "@/firebase/firebase.utils"

// const props = defineProps({
//     loginOrSignUp: { type: String }
// })

// const loginOrSignUp = ref({
//     login: {
//         gmail: "basic.login.gmailLogin",
//         facebook: "basic.login.facebookLogin"
//     },
//     signUp: { gamil: "", facebook: "" }
// })


</script>