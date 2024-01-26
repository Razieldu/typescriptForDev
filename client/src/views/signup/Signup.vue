<template>
  <div class="w-screen h-screen flex justify-center items-center halfDarkBg">
    <form action="">
      <div class="flex flex-col justify-center items-center h-[480px] w-[420px] gap-3 bg-white rounded-lg loginDiv ">
        <h1 class="text-3xl font-bold mb-5">
          {{ $t("basic.signUp.formtitle") }}
        </h1>
        <!-- <div class="flex w-[80%] h-[50px] ">
          <el-input class="loginInput" v-model="userAccount" :placeholder="$t('basic.signUp.accountPlaceholder')"
            type="email">
            {{ $t("basic.signUp.account") }}</el-input>
        </div> -->
        <!-- <div class="flex w-[80%] h-[50px]">
          <el-input class="loginInput" v-model="userPassword" :min="6"
            :placeholder="$t('basic.signUp.passwordPlaceholder')" type="password">
            {{ $t("basic.signUp.password") }}</el-input>
        </div> -->
        <!-- <el-button @click="handleSignUp(userAccount, userPassword, t)" size="large" type="primary">{{
          $t("basic.signUp.button") }}</el-button> -->
        <div class="flex gap-1 text-xs mt-3">
          <p class="darkP">{{ $t("basic.signUp.toLoginPage1") }}</p>
          <router-link to="/login">
            <p class="text-red-500 underline cursor-pointer font-bold">{{ $t("basic.signUp.toLoginPage2") }}</p>
          </router-link>
        </div>
        <LoginWith :login-or-sign-up="'signup'" />
      </div>
    </form>
  </div>
</template>

<script  setup lang="ts">
// import { handleSignUp } from "@/utils"
import LoginWith from "@/component/loginWith/LoginWith.vue";
// const { t } = useI18n();
// const userAccount = ref<string>("");
// const userPassword = ref<string>("");
</script>
  
