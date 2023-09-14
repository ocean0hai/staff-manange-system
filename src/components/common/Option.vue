<script lang="ts" setup>
import { Icon } from "@iconify/vue";
const emit = defineEmits(["changeShow"]);
</script>

<template>
  <div>
    <n-space class="pb-12px" justify="space-between">
      <n-space>
        <n-button
          type="primary"
          @click="
            () => {
              emit('changeShow', 'add');
            }
          "
        >
          <Icon class="mr-1" icon="gala:add" />
          新增
        </n-button>
        <n-button type="error">
          <Icon icon="mi:delete" />
          删除
        </n-button>
      </n-space>
      <n-space>
        <n-input-group>
          <n-input type="text" placeholder="请输入关键字" clearable> </n-input>
          <n-button ghost>
            <Icon class="text-2xl" icon="mdi:search" />
          </n-button>
        </n-input-group>
      </n-space>
    </n-space>
  </div>
</template>

<style scoped></style>
