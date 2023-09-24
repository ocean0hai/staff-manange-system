import { h, onMounted } from "vue";
import { NButton } from "naive-ui";
import type { DataTableColumns } from "naive-ui";
import { ref } from "vue";
import { objType,userType } from "@/type/admin";
export function userManage(
  addData: Function,
  deleteData: Function,
  Modify: Function,
  getData: Function
) {
  const createColumns = (): DataTableColumns<userType> => {
  return [
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

  const formData = ref([
    {
      label: "部门名称",
      key: "name",
    },
    {
      label: "详细信息",
      key: "remark",
    },
    {
      label: "备注",
      key: "descr",
      type: "textarea",
    },
  ]);
  const columns = createColumns();
  const show = ref(false);
  const itemdata = ref<objType>({});
  const options = ref("");
  function changeShow(option: string, row?: any) {
    console.log('fsafa');
    const item = {
      name: "",
      remark: "",
      descr: "",
    };

    if (option === "add") {
      itemdata.value = { ...item };
    } else {
      for (let key in item) {
        itemdata.value[key] = row[key];
      }
    }
    options.value = option;
    show.value = true;
  }
  async function Submit(data: any) {
    const arr = [{ ...data }];
    if (options.value === "add") {
      await addData(arr);
    } else {
      await Modify(arr);
    }
  }
  async function searchData(value: string) {
    await getData({ username: value });
  }
  onMounted(async () => {
    await getData();
  });
  return {
    show,
    itemdata,
    columns,
    formData,
    changeShow,
    searchData,
    Submit,
  };
}

