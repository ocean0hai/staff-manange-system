import { h } from "vue";
import { NButton } from "naive-ui";
import type { DataTableColumns } from "naive-ui";
import { ref } from "vue";
import { objType } from "@/type/admin";
import { roleType } from "@/type/admin";
export function roleManage(
  addData: Function,
  deleteData: Function,
  Modify: Function,
  getData: Function
) {
  const createColumns = (): DataTableColumns<roleType> => {
    return [
      {
        title: "Id",
        align: "center",
        key: "id",
      },
      {
        title: "名称",
        align: "center",
        key: "name",
      },
      {
        title: "详细",
        align: "center",
        key: "descr",
      },
      {
        title: "创建时间",
        key: "createTime",
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
        title: "更新用户",
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
              onClick: () => changeShow("", row),
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
  const formData = ref([
    {
      label: "身份名",
      key: "name",
    },
    {
      label: "详细",
      key: "descr",
      type: "textarea",
    },
  ]);
  const columns = createColumns();
  const show = ref(false);
  const itemdata = ref<objType>({});
  const options = ref("");
  function changeShow(option: string, row?: any) {
    const item = {
      name: "",
      descr: "",
    };

    if (option === "add") {
      itemdata.value = { ...item };
    } else {
      itemdata.value = { ...row };
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
    await getData({ name: value });
  }
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
