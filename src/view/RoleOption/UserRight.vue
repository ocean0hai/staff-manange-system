<script lang="ts" setup>
import { useRole } from "./roleRight";
import Option from "@/components/common/Option.vue";
import { ref } from "vue";
import { userRight } from "./userRight";
import { watch } from "vue";
const mothed = {
  postPath: "/userRole/inserts",//插入
  deletePath: "/userRole/deletes/",//删除
  queryPath:'/user/getByRoleId/',
  addListPath:"/user/getByRoleIdNot/"
};
const props = defineProps<{
  roleid: number;
}>();

const {
  roleID,
  currentPage,
  currentPageSize,
  totalPages,
  totalPageSizes,
  querydata,
  adddata,
  searchData,
  getAddData,
  queryGetData,
  deleteData,
  updatePage,
  updatePageSize,
  Add,
} = useRole(mothed);
const { addcolumns, queryucolumns} = userRight(deleteData, Add);
watch(()=>props.roleid,()=>{
     roleID.value=props.roleid
})
const show = ref(false);

function addShow() {
  show.value = true;
}
defineExpose({
  getAddData,
  queryGetData,
});
</script>

<template>
  <div>
    <!-- 弹窗增加 -->
    <n-modal v-model:show="show" class="w-1/2" preset="card">
      <div>
        <n-data-table :columns="addcolumns" :data="adddata" />
      </div>
    </n-modal>
    <Option @search-data="searchData" @add-show="addShow"></Option>
    <n-data-table :columns="queryucolumns" :data="querydata" />
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
</template>

<style scoped></style>
