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
// 将 Base64 字符串转换为 File 对象
function base64ToFile(base64String: string, fileName = "image.png") {
  // 将 Base64 字符串转换为字节数组
  const byteCharacters = atob(base64String.split(",")[1]);

  // 创建一个空的 Uint8Array
  const byteNumbers = new Uint8Array(byteCharacters.length);

  // 将字节填充到 Uint8Array 中
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  // 创建一个 Blob 对象
  const blob = new Blob([byteNumbers], { type: "image/png" });
  // 这里的 MIME 类型要与你的 Base64 字符串对应的图片类型相匹配
  // 创建一个 File 对象
  const file = new File([blob], fileName, { type: blob.type });
  //保存图片到本地
  return {
    file: file,
    blob: blob,
  };
}
// function downloadFile(file: any) {
//   const fileName = "image.png";
//   const link = document.createElement("a");
//   link.href = URL.createObjectURL(file);
//   link.download = fileName;
//   link.click();
// }
</script>
<style scoped></style>
