<template>
  <div class="w-screen h-screen flex justify-center items-center">
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

import { ref } from "vue";
import { useUserDataStore } from "../store/userDataStore";
import { ElMessage } from "element-plus";
import router from "../router";
import { useI18n } from 'vue-i18n'

const userAccount = ref<string>("");
const userPassword = ref<string>("");
const { login } = useUserDataStore();
const i18n = useI18n();
type MessageType = "success" | "warning" | "error" | "info";

interface MessageParams {
  showClose: boolean;
  message: string;
  type: MessageType;
}
function openMessage(param: MessageParams) {
  ElMessage(param);
}
const handleLogin = (account: string, password: string) => {
  let loginStatus = login(account, password);
  if (loginStatus === true) {
    openMessage({ type: "success", message: i18n.t("basic.login.successLogin"), showClose: true });
    setTimeout(() => {
      router.push("/");
    }, 1000);
  } else if (loginStatus === "請確認帳號密碼訊息") {
    openMessage({
      type: "error",
      message: i18n.t("basic.login.failToLogin"),
      showClose: true,
    });
  }
};
</script>

<style></style>