<script lang="ts" setup>
import LoginBg from "@/components/login/LoginBg.vue";
import LoginForm from "@/components/login/LoginForm.vue";
import LoginHeader from "@/components/login/LoginHeader.vue";
</script>

<template>
  <div>
    <div class="box">
      <LoginHeader></LoginHeader>
      <LoginForm></LoginForm>
    </div>
    <LoginBg></LoginBg>
  </div>
</template>

<style scoped>
.box {
  width: 350px;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  padding: 40px;
  background: #ffffff;
  border-radius: 20px;
  z-index: 90;
}
</style>
