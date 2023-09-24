<script lang="ts" setup>
import Option from "@/components/common/Option.vue";
import Form from "@/components/common/Form.vue";
import { useOptionData } from "@/hooks/useOptionData";
import { depType } from "@/type/admin";
import { posManage } from "@/utils/admin/posManage";
const mothed = {
  getPath: "/jobInf/getAll",
  postPath: "/jobInf/inserts",
  putPath: "/jobInf/updates",
  deletePath: "/jobInf/deletes/",
};
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
} = useOptionData<depType>(mothed);
const { show, itemdata, columns, formData, changeShow, searchData, Submit } =
  posManage(addData, deleteData, Modify, getData);
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

