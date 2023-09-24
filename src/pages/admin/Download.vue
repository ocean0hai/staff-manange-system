<script lang="ts" setup>
import Option from "@/components/common/Option.vue";
import Form from "@/components/common/Form.vue";
import { useOptionData } from "@/hooks/useOptionData";
import { noticeType } from "@/type/admin";
import { fileManage } from "@/utils/admin/fileManage";
const mothed = {
  getPath: "/documentInf/getAll",
  postPath: "/documentInf/inserts",
  putPath: "/documentInf/updates",
  deletePath: "/documentInf/deletes/",
};
const {
  totalPages,
  currentPage,
  currentPageSize,
  totalPageSizes,
  data,
  getData,
  deleteData,
  updatePage,
  updatePageSize,
} = useOptionData<noticeType>(mothed);
const { 
  show, 
  itemdata, 
  columns, 
  formData, 
  changeShow, 
  searchData, 
  Submit ,
  chagefile,
} =
  fileManage(deleteData, getData);

</script>

<template>
  <div>
    <div>
      <div v-if="show">
        <Form
          :form-data="formData"
          :edit="itemdata"
          @submit-data="Submit"
          v-model:model-value="show"
        >
          <n-form-item size="large" label="文件：">
            <n-upload @change="chagefile">
              <n-button>上传文件</n-button>
            </n-upload>
          </n-form-item>
        </Form>
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
  </div>
</template>

<style scoped></style>
