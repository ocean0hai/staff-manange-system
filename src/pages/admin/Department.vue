<script lang="ts" setup>
import { h } from "vue";
import { NButton } from "naive-ui";
import Option from "@/components/common/Option.vue";
import Form from "@/components/common/Form.vue";
import type { DataTableColumns } from "naive-ui";
import { useOptionData } from "@/hooks/useOptionData";
import { ref } from "vue";
interface objType {
  [key: string]: any;
}
interface deptInfType extends objType {
  id: number;
  name: string;
  remark: string;
  descr: string;
  createTime: number;
  createBy: string;
  updateTime: number;
  updateBy: number;
}
const mothed = {
  getPath: "/deptInf/getAll",
  postPath: "/deptInf/inserts",
  putPath: "/deptInf/updates",
  deletePath: "/deptInf/deletes/",
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
} = useOptionData<deptInfType>(mothed);

const createColumns = (): DataTableColumns<deptInfType> => {
  return [
    {
      title: "Id",
      align: "center",
      key: "id",
    },
    {
      title: "部门",
      align: "center",
      key: "name",
    },
    {
      title: "详细",
      align: "center",
      key: "remark",
    },
    {
      title: "备注",
      align: "center",
      key: "descr",
    },
    {
      title: "创建时间",
      key: "creatTime",
      align: "center",
    },
    {
      title: "创建用户",
      key: "createBy",
      align: "center",
    },
    {
      title: "更新时间",
      key: "updateTime",
      align: "center",
    },
    {
      title: "修改用户",
      key: "updateBy",
      align: "center",
    },
    {
      title: "操作",
      width: 50,
      titleColSpan: 2,
      align: "center",
      key: "actions",
      render(row) {
        return h(
          NButton,
          {
            strong: true,
            tertiary: true,
            type: "info",
            size: "small",
            onClick: () => changeShow("edit", row),
          },
          { default: () => "编辑" }
        );
      },
    },
    {
      width: 60,
      key: "actions",
      render(row) {
        const { id } = row;
        return h(
          NButton,
          {
            strong: true,
            tertiary: true,
            type: "info",
            size: "small",
            onClick: () => deleteData(id + ""),
          },
          { default: () => "删除" }
        );
      },
    },
  ];
};
const columns = createColumns();

const show = ref(false);
const formData = ref([
  {
    label: "部门",
    key: "name",
  },
  {
    label: "详细信息",
    key: "remark",
  },
  {
    label: "签名",
    key: "descr",
    type: "textarea",
  },
]);
const itemdata = ref<objType>({});
const options = ref("");
function changeShow(option: string, row?: any) {
  const item = {
    name: "",
    remark: "",
    descr: "",
  };
  if (option === "add") {
    itemdata.value = { ...item };
  } else {
    for (let key in row) {
      itemdata.value = row[key];
    }
  }
  options.value = option;
  show.value = true;
}
function Submit(data: any) {
  addData(data);
}
async function searchData(value: string) {
  await getData({ username: value });
}
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
    <Option @search-data="searchData" @change-show="changeShow"></Option>
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
