<script lang="ts" setup>
import { ref } from "vue";
import RegisterForm from "./RegisterForm.vue";
import { useMessage } from "naive-ui";
import { api } from "@/api/request";
const message = useMessage();
const formData = ref([
  {
    label: "用户名",
    key: "username",
  },
  {
    label: "昵称",
    key: "nickName",
  },
  {
    label: "密码",
    key: "password",
    type: "password",
  },
  {
    label: "确认密码",
    key: "password1",
    type: "password",
  },
]);
async function Submit(data: any) {
  localStorage.removeItem("codetoken");
  api
    .post(
      "/user/register",
      {
        ...data
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((res: any) => {
      if (res.code === 200) {
        message.success("注册成功!!");
      } else {
        message.success("注册失败了!!");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
</script>

<template>
  <div>
    <RegisterForm @get-form="Submit" :form-data="formData"></RegisterForm>
  </div>
</template>

<style scoped></style>
