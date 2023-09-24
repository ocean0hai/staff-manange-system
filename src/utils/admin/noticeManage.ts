import { h, onMounted } from "vue";
import { NButton } from "naive-ui";
import type { DataTableColumns } from "naive-ui";
import { ref } from "vue";
import { objType,noticeType } from "@/type/admin";
export function noticeManage(
  addData: Function,
  deleteData: Function,
  Modify: Function,
  getData: Function
) {
  const createColumns = (): DataTableColumns<noticeType> => {
    return [
      {
        title: "Id",
        align: "center",
        key: "id",
      },
      {
        title: "名称",
        align: "center",
        key: "title",
      },
      {
        title: "公告内容",
        align: "center",
        key: "content",
      },
      {
        title: "备注",
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
      label: "名称",
      key: "title",
    },
    {
      label: "内容",
      key: "content",
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
    const item = {
      title: "",
      content: "",
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
    await getData({ title: value });
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

