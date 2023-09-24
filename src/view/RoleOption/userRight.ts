import { h } from "vue";
import { NButton } from "naive-ui";
import type { DataTableColumns } from "naive-ui";
import { ref } from "vue";
import { api } from "@/api/request";
interface userRoleType {
  id: number;
  name: string;
  userRoleId:string
}

interface addType {
  id: number;
  username: string;
}

export function userRight(deleteData:Function,Add:Function) {
  const roleId=ref(-1)
  const QueryuColumns = (): DataTableColumns<userRoleType> => {
    return [
      {
        title: "列表id",
        align: "center",
        key: "userRoleId",
      },
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
        title: "操作",
        width: 60,
        key: "actions",
        render(row) {
          const { userRoleId } = row;
          return h(
            NButton,
            {
              strong: true,
              tertiary: true,
              type: "info",
              size: "small",
              onClick: () => deleteData(userRoleId),
            },
            { default: () => "删除" }
          );
        },
      },
    ];
  };
  const AddColumns = (): DataTableColumns<addType> => {
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
        title: "操作",
        width: 60,
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
              onClick: () => Add(id),
            },
            { default: () => "添加" }
          );
        },
      },
    ];
  };
  const queryucolumns=QueryuColumns()
  const addcolumns = AddColumns();
  return{
    roleId,
    queryucolumns,
    addcolumns
  }
}
