<script lang="ts" setup>
import Option from "@/components/common/Option.vue";
import Form from "@/components/common/Form.vue";
import { useOptionData } from "@/hooks/useOptionData";
import {roleManage  } from "@/utils";
import {roleType} from "@/type/admin"
import { onMounted } from "vue";
const mothed = {
  getPath: "/role/getAll",
  postPath: "/role/inserts",
  putPath: "/role/updates",
  deletePath: "/role/deletes/",
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
} = useOptionData<roleType>(mothed);
onMounted(async()=>{
  await getData() 
})
const { show, itemdata, columns, formData, changeShow, searchData, Submit } =
  roleManage( addData,deleteData,Modify, getData);
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

