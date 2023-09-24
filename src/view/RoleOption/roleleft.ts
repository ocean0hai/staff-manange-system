import { h, ref } from "vue";
import { NButton } from "naive-ui";
import type { DataTableColumns } from "naive-ui";
export interface objType {
  [key: string]: any;
}
export interface roleType extends objType {
  id: number;
  name: string;
  remark: string;
  descr: string;
  createTime: number;
  createBy: string;
  updateTime: number;
  updateBy: number;
}
export const mothed = {
  getPath: "/role/getAll",
  postPath: "",
  putPath: "",
  deletePath: "",
};
export function roleLeft(
  getData:Function
) {
  const roleId = ref<number>(-1);
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
        title: "操作",
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
              onClick: () => roleId.value= id ,
            },
            { default: () => "查看" }
          );
        },
      },
    ];
  };
  const columns = createColumns();
  const search = ref("");
  async function searchData() {
    await getData({ username: search.value });
  }
  return {
    columns,
    search,
    searchData,
    roleId
  };
}
