<script lang="ts" setup>
import Table from "@/components/common/Table.vue";
import { ref } from "vue";
import { useOptionData } from "@/hooks/useOptionData";

interface userObj {
  id: string;
  username: string;
  status: string;
  time: string;
}
const mothed = {
  getPath: "user",
  postPath: "",
  putPath: "",
  deletePath: "",
};
const columns = ref(["id", "用户名", "状态", "创建时间"]);
const { data } = useOptionData<userObj>(mothed);
</script>

<template>
  <div v-if="data?.length">
    <div v-for="(item, i) in data" :key="i">{{ item.id }}</div>
    <Table :columns="columns" :data="data"></Table>
  </div>
  <div v-else>暂时没有数据</div>
</template>

<style scoped></style>
