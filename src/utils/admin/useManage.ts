import { h, onMounted } from "vue";
import { NButton } from "naive-ui";
import type { DataTableColumns } from "naive-ui";
import { ref } from "vue";
import { objType, userType } from "@/type/admin";
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
      label: "用户名",
      key: "username",
    },
    {
      label: "昵称",
      key: "nickName",
    },
    {
      label: "备注",
      key: "descr",
    },
    {
      label: "密码",
      key: "password",
      type: "password",
    },
  ]);
  const columns = createColumns();
  const show = ref(false);
  const showimg = ref(false);
  const itemdata = ref<objType>({});
  const options = ref("");
  const image = ref();
  function changeShow(option: string, row?: any) {
    const item = {
      username: "",
      nickName: "",
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
    const obj = {
      multipartFile: image.value ? "" : image,
    };
    const subData = { ...data, ...obj };
    if (options.value === "add") {
      await addData(subData);
    } else {
      await Modify(subData);
    }
  }
  function uploadFile(files: any) {
    if (files.file === undefined) {
      image.value = files;
    } else {
      image.value = files.file.file;
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
    showimg,
    itemdata,
    columns,
    formData,
    uploadFile,
    changeShow,
    searchData,
    Submit,
  };
}
