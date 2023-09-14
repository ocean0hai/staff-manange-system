<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import { ref } from "vue";
const emit = defineEmits(["changeShow", "searchData"]);
const search = ref("");
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
      </n-space>
      <n-space>
        <n-input-group>
          <n-input
            type="text"
            v-model:value="search"
            @blur="
              () => {
                emit('searchData', search);
              }
            "
            placeholder="请输入关键字"
            clearable
          >
          </n-input>
          <n-button
            @click="
              () => {
                emit('searchData', search);
              }
            "
            ghost
          >
            <Icon class="text-2xl" icon="mdi:search" />
          </n-button>
        </n-input-group>
      </n-space>
    </n-space>
  </div>
</template>

<style scoped></style>
