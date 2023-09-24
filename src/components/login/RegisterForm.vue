<script lang="ts" setup>
import { ref } from "vue";
import { objType } from "@/type/admin";
import FaceImg from "../common/FaceImg.vue";
import { useMessage } from "naive-ui";
const message = useMessage();
const { formData } = defineProps<{
  formData: Array<any>;
}>();
const emit = defineEmits(["getForm"]);
const inputValue = ref<objType>({});
function changeInput(key: string, value: string) {
  inputValue.value[key] = value;
}
function uploadFile(files: any) {
  if (files.file === undefined) {
    image.value = files;
  } else {
    image.value = files.file.file;
  }
}

const image = ref();
const show = ref(false);
function submitData() {
  if (image.value === undefined) {
    message.warning("请上传人脸图片!!");
  } else if (inputValue.value.password !== inputValue.value.password1) {
    message.warning("请保证两个密码一致！");
  }
  emit("getForm", { ...inputValue.value, multipartFile: image.value });
}
</script>

<template>
  <div>
    <n-form
      ref="formRef"
      label-placement="left"
      label-width="auto"
      require-mark-placement="right-hanging"
      :style="{
        maxWidth: '640px',
      }"
    >
      <n-form-item
        v-for="(item, i) in formData"
        :key="i"
        size="large"
        :label="item.label"
        path="inputValue"
      >
        <input
          :value="inputValue[item.key]"
          class="border-none w-full h-full text-xl py-1 pl-3 text-gray-500 focus:border-none"
          :type="item?.type ? item.type : 'text'"
          :placeholder="'请输入' + item.label"
          @blur="
            changeInput(item.key, ($event.target as HTMLInputElement).value)
          "
        />
      </n-form-item>
    </n-form>
    <div v-if="show">
      <face-img @get-img="uploadFile"></face-img>
    </div>
    <div class="flex justify-center">
      <n-upload @change="uploadFile">
        <n-button>上传文件</n-button>
      </n-upload>
      <n-button type="info" @click="show = true">拍照上传</n-button>
    </div>
    <div class="w-auto mx-10">
      <n-button class="w-full" @click="submitData">注册</n-button>
    </div>
  </div>
</template>

<style scoped></style>
