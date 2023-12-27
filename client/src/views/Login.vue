<template>
  <div class="w-screen h-screen flex justify-center items-center halfDarkBg">
    <form action="">
      <div class="flex flex-col justify-center items-center h-[400px] w-[400px] gap-4 bg-white rounded-lg">
        <h1 class="text-2xl font-bold mb-5">
          {{ $t("basic.login.formtitle") }}
        </h1>
        <div class="flex w-[80%] h-[50px]">
          <el-input v-model="userAccount" :placeholder="$t('basic.login.accountPlaceholder')" type="email">
            {{ $t("basic.login.account") }}</el-input>
        </div>
        <div class="flex w-[80%] h-[50px]">
          <el-input v-model="userPassword" :placeholder="$t('basic.login.passwordPlaceholder')" type="password">
            {{ $t("basic.login.password") }}</el-input>
        </div>
        <router-link to="/"><el-button @click="handleLogin(userAccount, userPassword)" size="large" type="primary">{{
          $t("basic.login.button") }}</el-button></router-link>
      </div>
    </form>
  </div>
</template>
<fieldset></fieldset>

<script lang="ts" setup>

import { useUserDataStore } from "@/store";
import router from "@/router/router";
import { openMessage } from "@/utils"

const userAccount = ref<string>("");
const userPassword = ref<string>("");
const { login } = useUserDataStore();
const {t} = useI18n();

const handleLogin = (account: string, password: string) => {
  let loginStatus = login(account, password);
  if (loginStatus === true) {
    openMessage({ type: "success", message: t("basic.login.successLogin"), showClose: true });
    setTimeout(() => {
      router.push("/");
    }, 1000);
  } else if (loginStatus === "請確認帳號密碼訊息") {
    openMessage({
      type: "error",
      message: t("basic.login.failToLogin"),
      showClose: true,
    });
  }
};
</script>

<style></style>