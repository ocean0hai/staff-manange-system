<script lang="ts" setup>
import { onMounted } from "vue";
import SvgIcon from "./SvgIcon.vue";
import { userMessage } from "@/store";
const store = userMessage();
onMounted(async () => {
  await store.getUserMessage();
});
</script>

<template>
  <div class="pr-6">
    <div class="flex items-center text-2xl">
      <SvgIcon size="40px" class="pr-2" name="avatar"></SvgIcon>
      <span>{{ store.userMes?.username }}</span>
    </div>
    <div>

    </div>
  </div>
</template>

<style scoped></style>
