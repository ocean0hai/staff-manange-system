<script lang="ts" setup>
import Option from "@/components/common/Option.vue";
import Form from "@/components/common/Form.vue";
import { useOptionData } from "@/hooks/useOptionData";
import { userType } from "@/type/admin";
import { userManage } from "@/utils";
import FaceImg from '@/components/common/FaceImg.vue'
const mothed = {
  getPath: "/user/getAll",
  postPath: "/user/register",
  putPath: "/user/update",
  deletePath: "/user/delete/",
};
const {
  currentPage,
  currentPageSize,
  totalPages,
  totalPageSizes,
  data,
  addData,
  getData,
  deleteData,
  Modify,
  updatePage,
  updatePageSize,
} = useOptionData<userType>(mothed);
const {
  show,
  showimg,
  itemdata,
  columns,
  formData,
  uploadFile,
  changeShow,
  searchData,
  Submit,
} = userManage(addData, deleteData, Modify, getData);
</script>

<template>
  <div>
    <div v-if="show">
      <Form
        :form-data="formData"
        :edit="itemdata"
        @submit-data="Submit"
        v-model:model-value="show"
      >
        <div v-if="showimg">
          <face-img @get-img="uploadFile"></face-img>
        </div>
        <div class="flex justify-around">
          <n-upload @change="uploadFile">
            <n-button>上传文件</n-button>
          </n-upload>
          <n-button type="info" @click="showimg = true">拍照上传</n-button>
        </div>
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
</template>

<style scoped></style>
