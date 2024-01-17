<template>
  <div class="w-screen h-screen flex justify-center items-center halfDarkBg">
    <form action="">
      <div class="flex flex-col justify-center items-center h-[400px] w-[400px] gap-4 bg-white rounded-lg loginDiv ">
        <h1 class="text-2xl font-bold mb-5">
          {{ $t("basic.signUp.formtitle") }}
        </h1>
        <div class="flex w-[80%] h-[50px] ">
          <el-input class="loginInput" v-model="userAccount" :placeholder="$t('basic.signUp.accountPlaceholder')"
            type="email">
            {{ $t("basic.signUp.account") }}</el-input>
        </div>
        <div class="flex w-[80%] h-[50px]">
          <el-input class="loginInput" v-model="userPassword" :min="6"
            :placeholder="$t('basic.signUp.passwordPlaceholder')" type="password">
            {{ $t("basic.signUp.password") }}</el-input>
        </div>
        <router-link to="/login">
          <div class="darkP text-xs">{{ $t("basic.signUp.toLoginPage") }}</div>
        </router-link>
        <el-button @click="handleSignUp(userAccount, userPassword, t)" size="large" type="primary">{{
          $t("basic.signUp.button") }}</el-button>
      </div>
    </form>
  </div>
</template>

<script  setup lang="ts">
import { handleSignUp } from "@/utils"
const { t } = useI18n();
const userAccount = ref<string>("");
const userPassword = ref<string>("");
</script>
  
