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
        <LoginWith />
      </div>
    </form>
  </div>
</template>
<script  setup lang="ts">
import { handleLogin } from "@/utils"
import LoginWith from "@/component/loginWith/LoginWith.vue";
// import { onAuthStateChangedListener, signOutUser } from "@/firebase/firebase.utils"
// import { useUserDataStore } from "@/store";
// const { setLogin, logOut } = useUserDataStore();
const { t } = useI18n();
const userAccount = ref<string>("");
const userPassword = ref<string>("");
</script>
