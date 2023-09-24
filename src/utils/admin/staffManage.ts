import { h, onMounted } from "vue";
import { NButton } from "naive-ui";
import type { DataTableColumns } from "naive-ui";
import { ref } from "vue";
import { objType, staffType } from "@/type/admin";
export function staffManage(
  addData: Function,
  deleteData: Function,
  Modify: Function,
  getData: Function
) {
  const createColumns = (): DataTableColumns<staffType> => {
    return [
      {
        title: "名称",
        align: "center",
        key: "name",
      },
      {
        title: "身份证",
        align: "center",
        key: "name",
      },
      {
        align: "center",
        title: "住址",
        key: "address",
      },
      {
        title: "邮编",
        key: "postCode",
        align: "center",
      },
      {
        title: "电话",
        align: "center",
        key: "tel",
      },
      {
        align: "center",
        title: "手机",
        key: "phone",
      },
      {
        align: "center",
        title: "QQ",
        key: "qqNum",
      },
      {
        align: "center",
        title: "电子邮件",
        key: "email",
      },
      {
        align: "center",
        title: "性别",
        key: "sex",
      },
      {
        align: "center",
        title: "政治面貌",
        key: "party",
      },
      {
        align: "center",
        title: "出生日期",
        key: "birthday",
      },
      {
        align: "center",
        title: "民族",
        key: "race",
      },
      {
        align: "center",
        title: "学历",
        key: "education",
      },
      {
        align: "center",
        title: "专业",
        key: "speciality",
      },
      {
        align: "center",
        title: "特长",
        key: "hobby",
      },
      {
        title: "操作",
        width: 50,
        titleColSpan: 2,
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
      key: "name",
    },
    {
      label: "身份证",
      key: "name",
    },
    {
      label: "住址",
      key: "address",
    },
    {
      label: "邮编",
      key: "postCode",
    },
    {
      label: "电话",
      key: "tel",
    },
    {
      label: "手机",
      key: "phone",
    },
    {
      label: "QQ",
      key: "qqNum",
    },
    {
      label: "电子邮件",
      key: "email",
    },
    {
      label: "性别",
      key: "sex",
    },
    {
      label: "政治面貌",
      key: "party",
    },
    {
      label: "出生日期",
      key: "birthday",
    },
    {
      label: "民族",
      key: "race",
    },
    {
      label: "学历",
      key: "education",
    },
    {
      label: "专业",
      key: "speciality",
    },
    {
      label: "特长",
      key: "hobby",
    },
  ]);
  const columns = createColumns();
  const show = ref(false);
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
    await getData({ name: value });
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
