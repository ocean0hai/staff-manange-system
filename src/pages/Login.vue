<script lang="ts" setup>
import LoginBg from "@/components/login/LoginBg.vue";
import LoginPW from "@/components/login/LoginPW.vue";
import LoginHeader from "@/components/login/LoginHeader.vue";
import LoginFace from "@/components/login/LoginFace.vue";
import Register from  "@/components/login/Register.vue"
import { ref } from "vue";
const show = ref(0);
const menuArr = ref(["账号密码", "人脸登录", "注册账号"]);
</script>

<template>
  <div>
    <div class="centerbox w-100">
      <LoginHeader></LoginHeader>
      <LoginPW v-if="show === 0"> </LoginPW>
      <LoginFace v-else-if="show === 1"></LoginFace>
      <Register v-else> </Register>
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
