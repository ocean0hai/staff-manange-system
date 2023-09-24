import { useMessage } from "naive-ui";
import { Delete, Post } from "@/api/mothed";
import { ref } from "vue";
import { api } from "@/api/request";
interface mothedType {
  postPath: string;
  deletePath: string;
  queryPath: string;
  addListPath: string;
}
interface dataType<T> {
  current: number;
  pages: number;
  records: T[];
  size: number;
  total: number;
}
export function useRole<T>(mothed: mothedType) {
  const roleID = ref(-1);
  const search = ref("");
  const message = useMessage();
  const querydata: any = ref();
  const adddata = ref<Array<any>>();
  const currentPage = ref<number>(1); //当前页
  const currentPageSize = ref<number>(10); //当前每10条数据
  const totalPages = ref<number>(20); //总页数
  const dataTotal = ref<number>(0); //总的条数
  const totalPageSizes = [
    {
      label: "10 每页",
      value: 10,
    },
    {
      label: "20 每页",
      value: 20,
    },
    {
      label: "30 每页",
      value: 30,
    },
    {
      label: "40 每页",
      value: 40,
    },
  ];
  //删除
  async function deleteData(id: number) {
    try {
      const res: any = await Delete(mothed.deletePath + id);
      if (res.code === 200) {
        message.success("删除成功！");
        await queryGetData(roleID.value);
      }
    } catch (error) {
      console.log(error);
    }
  }
  //添加用户到对应的角色列表中
  async function Add(id: number) {
    try {
      const data = [
        {
          userId: id,
          roleId: roleID.value,
        },
      ];
      const res: any = await api.post(mothed.postPath, [...data]);
      if (res.code === 200) {
        await queryGetData(roleID.value);
        await getAddData(roleID.value);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function updatePage(id: number) {
    //执行函数得到数据函数
    currentPage.value = id;
    await queryGetData(roleID.value);
  }
  async function updatePageSize(id: number) {
    currentPageSize.value = id;
    currentPage.value = 1;
    await queryGetData(roleID.value);
  }
  //得到增加函数的数据
  async function getAddData(id: number) {
    const res: any = await api.get(mothed.addListPath + id, {
      params: {
        size: 9999,
      },
    });
    if (res?.code === 200 && res?.records) {
      adddata.value = [...res.data.records];
    }
  }
  //得到查询的数据
  async function queryGetData(id: number) {
    try {
      const params = {
        current: currentPage.value,
        size: currentPageSize.value,
      };
      const res: any = await api.get(mothed.queryPath + id, {
        params: {
          ...params,
        },
      });
      if (res.code === 200) {
        const { total, records, pages } = res.data;
        dataTotal.value = total;
        totalPages.value = pages;
        querydata.value = records;
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function searchData(value: string) {
    search.value = value;
    currentPage.value = 1;
    await queryGetData(roleID.value);
  }
  return {
    roleID,
    currentPage,
    currentPageSize,
    totalPages,
    dataTotal,
    totalPageSizes,
    adddata,
    querydata,
    searchData,
    getAddData,
    queryGetData,
    updatePage,
    updatePageSize,
    deleteData,
    Add,
  };
}
