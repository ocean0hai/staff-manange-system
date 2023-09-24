<script lang="ts" setup>
import Option from "@/components/common/Option.vue";
import Form from "@/components/common/Form.vue";
import { useOptionData } from "@/hooks/useOptionData";
import { staffManage } from "@/utils";
import { staffType } from "@/type/admin";
const mothed = {
  getPath: "/employeeInf/getAll",
  postPath: "/employeeInf/inserts",
  putPath: "/employeeInf/updates",
  deletePath: "/employeeInf/deletes/",
};
// const columns = ref(["id", "用户名", "是否锁定", "身份"]);
const {
  totalPages,
  currentPage,
  currentPageSize,
  totalPageSizes,
  data,
  addData,
  Modify,
  getData,
  deleteData,
  updatePage,
  updatePageSize,
} = useOptionData<staffType>(mothed);
const { show, itemdata, columns, formData, changeShow, searchData, Submit } =
  staffManage(addData, deleteData, Modify, getData);
</script>

<template>
  <div>
    <div v-if="show">
      <Form
        :form-data="formData"
        :edit="itemdata"
        @submit-data="Submit"
        v-model:model-value="show"
      ></Form>
    </div>
    <Option @search-data="searchData" @add-show="changeShow"></Option>
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
</template>

<style scoped></style>

