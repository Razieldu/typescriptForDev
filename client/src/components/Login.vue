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
            @click="handleLogin(userAccount, userPassword)"
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
import { ElMessage } from "element-plus";
import router from "../router";
export default {
  setup() {
    const userAccount = ref<string>("");
    const userPassword = ref<string>("");
    const { login } = useUserDataStore();
    const { isLogin } = storeToRefs(useUserDataStore());
    
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
        openMessage({ type: "success", message: "登入成功", showClose: true });
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else if (loginStatus === "請確認帳號密碼訊息") {
        openMessage({
          type: "error",
          message: "請確認帳號密碼訊息",
          showClose: true,
        });
      }
    };
    return {
      handleLogin,
      userAccount,
      userPassword,
      login,
      isLogin,
    };
  },
};
</script>

<style>
</style>