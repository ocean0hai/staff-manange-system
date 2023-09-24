import { h } from "vue";
import { NButton } from "naive-ui";
import type { DataTableColumns } from "naive-ui";
import { ref } from "vue";
interface userRoleType {
  id: number;
  name: string;
  descr: string;
  apiPath: string;
  roleAuthorityId: number;
  createTime: string;
  createBy: string;
  updateTime: string;
  updateBy: string;
}

interface addType {
  id: number;
  username: string;
}

export function authorityRight(deleteData: Function, Add: Function) {
  const roleId = ref(-1);
  const QueryuColumns = (): DataTableColumns<userRoleType> => {
    return [
      {
        title: "权限名称",
        align: "center",
        key: "name",
      },
      {
        title: "接口路径",
        align: "center",
        key: "apiPath",
      },
      {
        title: "详细",
        key: "descr",
        align: "center",
      },
      {
        title: "创建时间",
        key: "creatTime",
        align: "center",
      },
      {
        title: "创建人",
        key: "creatBy",
        align: "center",
      },
      {
        title: "更新时间",
        key: "updateTime",
        align: "center",
      },
      {
        title: "更新人",
        key: "updateBy",
        align: "center",
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
              onClick: () => deleteData(id),
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
  const queryucolumns = QueryuColumns();
  const addcolumns = AddColumns();
  return {
    roleId,
    queryucolumns,
    addcolumns,
  };
}
