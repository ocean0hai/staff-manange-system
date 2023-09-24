<script lang="ts" setup>
import { useOptionData } from "@/hooks/useOptionData";
import { roleType, mothed, roleLeft } from "./roleleft";
import UserRight from "./UserRight.vue";
import AuthorityRight from "./AuthorityRight.vue";
import { ref, computed, onMounted, watch } from "vue";
import { Icon } from "@iconify/vue/dist/iconify.js";
import { useRoute } from "vue-router";
const route = useRoute();
const {
  totalPages,
  currentPage,
  currentPageSize,
  totalPageSizes,
  data,
  getData,
  updatePage,
  updatePageSize,
} = useOptionData<roleType>(mothed);
const { columns, searchData, search,roleId } = roleLeft(getData);
const children = ref();
onMounted(async () => {
  await getData().then(async () => {
    if (data.value !== undefined) {
      roleId.value = data.value[0].id;
      // await children.value.queryGetData(roleId.value);
      // await children.value.getAddData(roleId.value);
    }
  });
});
watch(
  () => roleId.value,
  async () => {
    await children.value.queryGetData(roleId.value);
    await children.value.getAddData(roleId.value);
  }
);
const url: any = computed(() => {
  const str = route.name;
  if (typeof str === "string") {
    return route.name;
  } else {
    return "";
  }
});

</script>

<template>
  <div class="flex">
    <div class="w-96">
      <n-input-group class="w-auto mr-2">
        <n-input
          type="text"
          v-model:value="search"
          @keyup.enter="searchData"
          placeholder="请输入关键字"
          clearable
        >
          <template #prefix>
            <Icon class="text-2xl" icon="mdi:search" />
          </template>
        </n-input>
      </n-input-group>
      <n-data-table class="text-center" :columns="columns" :data="data" />
      <n-pagination
        show-quick-jumper
        show-size-picker
        class="mx-auto"
        v-model:page="currentPage"
        :page-count="totalPages"
        :on-update:page="updatePage"
        v-model:page-size="currentPageSize"
        :page-sizes="totalPageSizes"
        :on-update:page-size="updatePageSize"
      />
    </div>
    <div class="flex-1" v-if="url === 'userrole'">
      <UserRight ref="children" :roleid="roleId"></UserRight>
    </div>
    <div class="flex-1" v-else>
      <AuthorityRight ref="children" :roleid="roleId"></AuthorityRight>
    </div>
  </div>
</template>

<style scoped></style>
