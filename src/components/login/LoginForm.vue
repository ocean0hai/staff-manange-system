<template>
  <n-form
    ref="formRef"
    :model="model"
    :rules="rules"
    size="large"
    :show-label="false"
  >
    <n-form-item path="userName">
      <n-input v-model:value="model.userName" />
    </n-form-item>
    <n-form-item path="password" label="密码">
      <n-input v-model:value="model.password" type="password" />
    </n-form-item>
    <n-form-item path="user.age" label="验证">
      <div class="flex items-center">
        <n-input class="h-10" v-model:value="code" placeholder="" />
        <img
          class="w-28 h-16 ml-3"
          id="code"
          :src="url"
          @click="setCode"
          alt=""
        />
      </div>
    </n-form-item>
    <n-space :vertical="true" :size="24">
      <div class="flex justify-between">
        <n-checkbox v-model:checked="rememberMe">记住我</n-checkbox>
        <n-button :text="true" @click="">忘记密码？ </n-button>
      </div>
      <n-button
        type="info"
        size="large"
        :block="true"
        :round="true"
        @click="handleSubmit"
      >
        登录
      </n-button>
      <slot></slot>
    </n-space>
  </n-form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { login } from "@/api/login";
import type { FormInst } from "naive-ui";
const url = ref("https://wowms.sszsj.com/api/user/codeImage");
const code = ref();
const formRef = ref<HTMLElement & FormInst>();
const model = ref({
  userName: "Soybean",
  password: "soybean123",
  code: 0,
});
const rules = ref({
  user: {
    age: {
      required: true,
      message: "请输入数字",
      trigger: ["input", "blur"],
    },
  },
});
const rememberMe = ref(false);
async function handleSubmit() {
  model.value.code = Number(code);
  login(model.value);
}
function setCode() {
  const num = new Date().getSeconds();
  url.value = "https://wowms.sszsj.com/api/user/codeImage?data=" + num;
}
</script>

<style scoped></style>
