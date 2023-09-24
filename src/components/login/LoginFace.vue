<template>
  <div>
    <FaceImge @get-img="submitData"></FaceImge>
    <img ref="photo" style="display: none" class="w-90 h-80" />
  </div>
</template>

<script setup lang="ts">
import FaceImge from "@/components/common/FaceImg.vue";
import { api } from "@/api/request";
import { useMessage } from "naive-ui";
import { ref } from "vue";

import { useRouter } from "vue-router";
const router = useRouter();
const photo: any = ref("");
const message = useMessage();

async function submitData(file: any) {
 
  localStorage.removeItem("codetoken");
  api
    .post(
      "/user/loginByFace1",
      {
        multipartFile: file,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((res: any) => {
      console.log(res);
      if (res.code === 200) {
        message.success("登录成功!!");
        router.push({ name: "user" });
      } else {
        message.success("登录失败了!!");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
</script>
<style scoped></style>
