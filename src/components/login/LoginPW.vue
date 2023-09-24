<template>
  <n-form :model="model" :rules="rules" size="large" :show-label="false">
    <n-form-item path="userName">
      <n-input v-model:value="model.username" />
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
          :src="codeImg"
          @click="setCodeImge"
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
import { onMounted } from "vue";
import { api } from "@/api/request";
import { useRouter } from "vue-router";
import { useMessage } from "naive-ui";

const router = useRouter();
const message = useMessage();
const codeImg = ref("");
const code = ref("");
const model = ref({
  username: "admin",
  password: "114514",
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
onMounted(() => {
  setCodeImge();
});
async function handleSubmit() {
  model.value.code = parseInt(code.value);
  const str = await login(model.value);
  if (str === "1") {
    message.success("登录成功！");
    router.push({ name: "user" });
  } else {
    message.error(str);
  }
}

async function setCodeImge() {
  const num = new Date().getSeconds();
  const res: any = await api.get("/user/codeImage?data=" + num, {
    responseType: "arraybuffer",
    headers: {
      "Content-Type": "image/png",
    },
  });
  codeImg.value = window.URL.createObjectURL(new Blob([res]));
}
</script>

<style scoped></style>
