<script lang="ts" setup>
const { logosize, textcss, open } = defineProps<{
  logosize: string;
  textcss: string;
  open: boolean;
}>();
//是否属于展开状态
</script>

<template>
  <div class="text-blue-400 flex items-center">
    <svgIcon name="logo" :class="[open ? 'flex-1 ml-1 py-4':'ml-3']"  :size="logosize"></svgIcon>
    <p v-if="!open" :class="[textcss]">CSI员工之家</p>
  </div>
</template>

<style scoped></style>
