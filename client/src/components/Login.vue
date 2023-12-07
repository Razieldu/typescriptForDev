<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <form action="">
      <div
        class="flex flex-col justify-center items-center h-[400px] w-[400px] gap-4 bg-white rounded-lg"
      >
        <h1 class="text-2xl font-bold mb-5">請進行身分驗證</h1>
        <div class="flex w-[80%] h-[50px]">
          <el-input v-model="userAccount" placeholder="請輸入帳號" type="email"
            >帳號</el-input
          >
        </div>
        <div class="flex w-[80%] h-[50px]">
          <el-input
            v-model="userPassword"
            placeholder="請輸入密碼"
            type="password"
            >密碼</el-input
          >
        </div>
        <router-link to="/"
          ><el-button
            @click="login(userAccount, userPassword)"
            size="large"
            type="primary"
            >登入</el-button
          ></router-link
        >
      </div>
    </form>
  </div>
</template>
<fieldset></fieldset>
<script lang="ts">
import { ref } from "vue";
import { useUserDataStore } from "../store/userDataStore";
import { storeToRefs } from "pinia";
export default {
  setup() {
    const userAccount = ref<string>("");
    const userPassword = ref<string>("");
    const { login } = useUserDataStore();
    const { isLogin } = storeToRefs(useUserDataStore());
    return { userAccount, userPassword, login, isLogin };
  },
};
</script>

<style>
</style>