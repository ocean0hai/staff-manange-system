<script lang="ts" setup>
import LoginBg from "@/components/login/LoginBg.vue";
import LoginPW from "@/components/login/LoginPW.vue";
import LoginHeader from "@/components/login/LoginHeader.vue";
import LoginFace from "@/components/login/LoginFace.vue";
import RegisterForm from "@/components/login/RegisterForm.vue";
import { ref } from "vue";
const show = ref(1);
const menuArr = ref(["账号密码", "人脸登录", "注册账号"]);
</script>

<template>
  <div>
    <div class="centerbox w-100">
      <LoginHeader></LoginHeader>
      <LoginPW v-if="show === 0"> </LoginPW>
      <LoginFace v-else-if="show === 1"></LoginFace>
      <RegisterForm v-else> </RegisterForm>
      <div class="w-auto mx-9 py-3">
        <n-button
          v-for="(item, i) in menuArr"
          :type="show !== i ? 'default' : 'info'"
          :key="i"
          @click="show=i"
          class="mx-1"
        >
          {{ item }}
        </n-button>
      </div>
    </div>
    <LoginBg></LoginBg>
  </div>
</template>

<style scoped>
</style>
