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
          <div class="text-xs">{{ $t("basic.signUp.toLoginPage") }}</div>
        </router-link>
       <el-button @click="handleSignUp(userAccount, userPassword)" size="large" type="primary">{{
          $t("basic.signUp.button") }}</el-button>
      </div>
    </form>
  </div>
</template>
  
  
<script lang="ts" setup>

import { useUserDataStore } from "@/store";
import { createAuthUserWithEmailAndPassword } from "@/firebase/firebase.utils";
import router from "@/router/router";
import { openMessage } from "@/utils"

const userAccount = ref<string>("");
const userPassword = ref<string>("");
const { setLogin } = useUserDataStore();
const { t } = useI18n();

const handleSignUp = async (account: string, password: string) => {
  try {
    const authResult = await createAuthUserWithEmailAndPassword(account, password);
    const user = authResult?.user;

    let loginStatus: boolean | string = user ? true : "請確認帳號密碼訊息";

    if (loginStatus === true) {
      setLogin(user);
      openMessage({ type: "success", message: t("basic.login.successLogin"), showClose: true });
      setTimeout(() => {
        router.push("/");
      }, 500);
    } else if (loginStatus === "請確認帳號密碼訊息") {
      openMessage({
        type: "error",
        message: t("basic.login.failToLogin"),
        showClose: true,
      });
    }
  } catch (error) {
    // 处理可能的登录失败情况
    console.error("登录失败", error);
    openMessage({
      type: "error",
      message: t("basic.login.failToLogin"),
      showClose: true,
    });
  }
};
</script>
  
<style></style>