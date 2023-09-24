import { defineConfig } from "unocss";
import { h, onMounted } from "vue";
import { NButton } from "naive-ui";
import type { DataTableColumns } from "naive-ui";
import { ref } from "vue";
import { useMessage } from "naive-ui";
import { objType, fileType } from "@/type/admin";
import { api } from "@/api/request";
export function fileManage(deleteData: Function, getData: Function) {
  const message = useMessage();
  const createColumns = (): DataTableColumns<fileType> => {
    return [
      {
        title: "Id",
        align: "center",
        key: "id",
      },
      {
        title: "标题",
        align: "center",
        key: "title",
      },
      {
        title: "文件名",
        align: "center",
        key: "fileName",
      },
      {
        title: "路径",
        align: "center",
        key: "filePath",
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
        width: 70,
        titleColSpan: 2,
        align: "center",
        key: "actions",
        render(row) {
          const { id, fileName } = row;
          return h(
            NButton,
            {
              strong: true,
              tertiary: true,
              type: "info",
              size: "small",
              onClick: () => downloadFile(id, fileName),
            },
            { default: () => "下载文件" }
          );
        },
      },
      {
        align: "center",
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
      label: "备注",
      key: "descr",
    },
  ]);
  const columns = createColumns();
  const show = ref(false);
  const itemdata = ref<objType>({});
  const options = ref("");
  const fileObj = ref({});
  function changeShow(option: string, row?: any) {
    const item = {
      title: "",
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
    try {
      await api
        .post(
          "/documentInf/upload",
          {
            ...data,
            multipartFile: fileObj.value,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(async (res: any) => {
          if (res?.code === 200) {
            await getData();
            message.success("上传成功！");
          }
        });
    } catch (error) {
      console.log(error);
    }
  }
  async function searchData(value: string) {
    await getData({ title: value });
  }
  function chagefile(file: any) {
    fileObj.value = file.file.file;
  }
  function downloadFile(id: number, fileName: string) {
    api
      .get("/documentInf/download/" + id, {
        responseType: "blob",
      })
      .then((res: any) => {
        const url = window.URL.createObjectURL(new Blob([res]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName); // or any other extension
        document.body.appendChild(link);
        link.click();
      });
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
    chagefile,
    Submit,
  };
}
