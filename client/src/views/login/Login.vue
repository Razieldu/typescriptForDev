<template>
  <div class="w-screen h-screen flex justify-center items-center halfDarkBg">
    <form action="">
      <div class="flex flex-col justify-center items-center h-[400px] w-[400px] gap-3 bg-white rounded-lg loginDiv ">
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
        <div class="flex">
          <Image class="w-[60px] h-[40px] cursor-pointer" :src="'google'" :fit="'fill'" />
          <Image class="w-[64px] h-[36px] cursor-pointer" :src="'facebook'" :fit="'fill'" />
        </div>
        <el-button @click="handleLogin(userAccount, userPassword, t)" size="large" type="primary">{{
          $t("basic.login.button") }}</el-button>
        <div class="flex gap-1 text-xs">
          <p class="darkP">{{ $t("basic.login.toSignUpPage1") }}</p>
          <router-link to="/signUp">
            <p class="text-red-500 underline cursor-pointer font-bold">{{ $t("basic.login.toSignUpPage2") }}</p>
          </router-link>
        </div>
      </div>
    </form>
  </div>
</template>
<script  setup lang="ts">
import { handleLogin } from "@/utils"
import Image from "@/component/image/Image.vue";
const { t } = useI18n();
const userAccount = ref<string>("");
const userPassword = ref<string>("");


</script>
