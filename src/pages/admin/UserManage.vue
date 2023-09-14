<script lang="ts" setup>
import { h } from "vue";
import { NButton } from "naive-ui";
import Option from "@/components/common/Option.vue";
import Form from "@/components/common/Form.vue";
import type { DataTableColumns } from "naive-ui";
import { useOptionData } from "@/hooks/useOptionData";
import { ref } from "vue";
interface objType {
  [key: string]: string;
}
interface userType extends objType {
  id: string;
  username: string;
  isLocked: string;
  nickName: string;
  descr: string;
}
const mothed = {
  getPath: "/user/getAll",
  postPath: "/user/register",
  putPath: "/user/update",
  deletePath: "/user/delete/",
};
// const columns = ref(["id", "用户名", "是否锁定", "身份"]);
const {
  currentPage,
  currentPageSize,
  totalPages,
  totalPageSizes,
  data,
  addData,
  getData,
  Modify,
  deleteData,
  updatePage,
  updatePageSize,
} = useOptionData<userType>(mothed);

const createColumns = (): DataTableColumns<userType> => {
  return [
    {
      title: "Id",
      align: "center",
      key: "id",
    },
    {
      title: "用户名",
      align: "center",
      key: "username",
    },
    {
      title: "是否锁定",
      align: "center",
      key: "isLocked",
    },
    {
      title: "昵称",
      align: "center",
      key: "nickName",
    },
    {
      title: "签名",
      align: "center",
      key: "descr",
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
            onClick: () => deleteData(id),
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
    label: "名字",
    key: "username",
  },
  {
    label: "昵称",
    key: "nickName",
  },
  // {
  //   label: "签名",
  //   key: "descr",
  // },
  {
    label: "密码",
    key: "password",
    type: "password",
  },
]);
const itemdata = ref<objType>({});
const options = ref("");
function changeShow(option: string, row?: any) {
  const item = {
    username: "",
    nickName: "",
    password: "",
  };
  if (option === "add") {
    itemdata.value = { ...item };
  } else {
    itemdata.value = { ...row };
  }
  options.value = option;
  show.value = true;
}

function Submit(data: any) {
  if (options.value === "add") {
    addData(data);
  } else {
    if (data.password === undefined) {
      Modify(data);
    } else {
      const { password, ...obj } = data;
      Modify(obj);
    }
    itemdata.value = {};
  }
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
