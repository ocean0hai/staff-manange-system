<script lang="ts" setup>
import LoginBg from "@/components/login/LoginBg.vue";
import LoginForm from "@/components/login/LoginForm.vue";
import RegisterForm from "@/components/login/RegisterForm.vue";
import LoginHeader from "@/components/login/LoginHeader.vue";
import { ref } from "vue";
const register = ref(false);
</script>

<template>
  <div>
    <div class="centerbox">
      <LoginHeader></LoginHeader>
      <LoginForm v-if="!register">
        <div class="text-right text-blue-500">
          <p @click="register = true">注册></p>
        </div>
      </LoginForm>
      <RegisterForm v-else>
        <div class="text-left text-blue-500">
          <p @click="register = false">&lt;登录</p>
        </div>
      </RegisterForm>
    </div>
    <LoginBg></LoginBg>
  </div>
</template>

<style scoped></style>
