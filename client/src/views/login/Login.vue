<template>
  <div class="w-screen h-screen flex justify-center items-center halfDarkBg ">
    <form action="">
      <div class="flex flex-col justify-center items-center h-[480px] w-[420px] gap-3 bg-white rounded-lg loginDiv ">
        <h1 class="text-2xl font-bold mb-5">
          {{ $t("basic.login.formtitle") }}
        </h1>
        <div class="flex w-[80%] h-[50px] ">
          <el-input class="loginInput" v-model="userAccount" :placeholder="$t('basic.login.accountPlaceholder')"
            type="email">
            {{ $t("basic.login.account") }}</el-input>
        </div>
        <div class="flex w-[80%] h-[50px]">
          <el-input class="loginInput" v-model="userPassword" :min="6"
            :placeholder="$t('basic.login.passwordPlaceholder')" type="password">
            {{ $t("basic.login.password") }}</el-input>
        </div>
        <el-button @click="handleLogin(userAccount, userPassword, t)" size="large" type="primary">{{
          $t("basic.login.button") }}</el-button>
        <div class="flex gap-1 text-xs mt-3">
          <p class="darkP">{{ $t("basic.login.toSignUpPage1") }}</p>
          <router-link to="/signUp">
            <p class="text-red-500 underline cursor-pointer font-bold">{{ $t("basic.login.toSignUpPage2") }}</p>
          </router-link>
        </div>
        <div class="mt-1 font-bold grid  grid-rows-2 gap-2">
          <div class="flex items-center justify-center">
            <hr class="border-t border-gray-200 my-1 w-[90%]">
          </div>
          <div class="grid grid-cols-5 bg-red-400 w-[336px] cursor-pointer rounded-lg text-white loginDivGandF hover:bg-red-300">
            <Image class="w-[25px] h-[25px]  col-span-1" :src="'google'" :fit="'fill'" />
            <div class="flex justify-center items-center col-span-4 relative">
              <p class="absolute left-12 text-sm ">{{ $t("basic.login.gmailLogin") }}</p>
            </div>
          </div>
          <div class="grid grid-cols-5 bg-blue-400 w-[336px] cursor-pointer rounded-lg text-white loginDivGandF hover:bg-blue-300 ">
            <Image class="w-[25px] h-[25px]  col-span-1" :src="'facebook'" :fit="'fill'" />
            <div class="flex justify-center items-center col-span-4 relative">
              <p class="absolute left-12 text-sm ">{{ $t("basic.login.facebookLogin") }}</p>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script  setup lang="ts">
import { handleLogin } from "@/utils"
import Image from "@/component/elementPlus/image/Image.vue";
const { t } = useI18n();
const userAccount = ref<string>("");
const userPassword = ref<string>("");

</script>
