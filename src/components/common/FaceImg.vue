<script setup lang="ts">
import { onUnmounted } from "vue";
import { onMounted } from "vue";
import { ref } from "vue";
const video = ref();
const canvas = ref();
const test = ref();
const emit = defineEmits(["getImg", "cancel"]);

onMounted(async () => {
  // 调用摄像头
  await navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      // 将摄像头捕捉到的视频流绑定到video元素上
      video.value.srcObject = stream;
      test.value = stream;
    })
    .catch((error) => {
      console.error(error);
    });
});
async function takePhoto() {
  const canvas = document.createElement("canvas");
  canvas.width = video.value.videoWidth;
  canvas.height = video.value.videoHeight;
  canvas
    .getContext("2d")
    ?.drawImage(video.value, 0, 0, canvas.width, canvas.height);
  canvas.toBlob((res) => {
    if (res !== null) {
      const file = new File([res], "image.png", { type: "image/png" });
      emit("getImg", file);
    }
  });
  clearVideo();
  // 保存图片，可以使用 axios 等库发送请求将图片上传到后台服务器
}
onUnmounted(() => {
  clearVideo();
});
const clearVideo = () => {
  // 关闭摄像头
  if (video.value?.srcObject !== undefined) {
    const stream = video.value.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track: any) => {
      track.stop();
    });
    video.value.srcObject = null;
  } else {
    const stream = test.value;
    const tracks = stream.getTracks();
    tracks.forEach((track: any) => {
      track.stop();
    });
    test.value = null;
  }
  emit("cancel");
  show.value = false;
};
const show = ref(true);
</script>
<template>
  <div v-if="show">
    <div class="text-center box">
      <video ref="video" autoplay class="w-90 h-70"></video>
      <span>
        <n-button class="mx-1" type="info" @click="takePhoto">拍照</n-button>
        <n-button class="mx-1" type="info" @click="clearVideo">取消</n-button>
      </span>
    </div>
    <canvas ref="canvas" style="display: none"></canvas>
  </div>
</template>

<style scoped>
.box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /*-webkit 是表示针对 safari 浏览器支持，-ms表示针对 IE 浏览器支持*/
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  z-index: 50;
}
</style>
