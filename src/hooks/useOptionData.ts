import { onMounted, ref } from "vue";
import { Delete, Get, Post, Put } from "@/api/mothed";
import { useMessage } from "naive-ui";
interface mothedType {
  getPath: string;
  postPath: string;
  putPath: string;
  deletePath: string;
}
interface dataType<T> {
  current: number;
  pages: number;
  records: T[];
  size: number;
  total: number;
}
export function useOptionData<T>(mothed: mothedType) {
  const message = useMessage();
  const data = ref<T[]>();
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
  async function getData(parma?: any) {
    try {
      const params = {
        ...parma,
        current: currentPage.value,
        size: currentPageSize.value,
      };
      const res = await Get<dataType<T>>(mothed.getPath, params);
      const { total, records, pages } = res.data;
      dataTotal.value = total;
      totalPages.value = pages;
      data.value = [...records];
    } catch (err) {
      console.log(err);
    }
  }
  async function deleteData(id: string) {
    try {
      const res: any = await Delete(mothed.deletePath + id);
      if (res.code === 200) {
        message.success("删除成功！");
        await getData();
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function Modify(params: any) {
    try {
      const res: any = await Put(mothed.putPath, params);
      if (res.code === 200) {
        message.success("修改成功！");
        await getData();
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function addData(params: any) {
    try {
      const res: any = await Post(mothed.postPath, params);
      if (res.code === 200) {
        message.success("添加成功！！");
        await getData();
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function updatePage(id: number) {
    //执行函数得到数据函数
    currentPage.value = id;
    await getData();
  }
  async function updatePageSize(id: number) {
    currentPageSize.value = id;
    currentPage.value = 1;
    await getData();
  }
  onMounted(async () => {
    await getData();
  });
  return {
    data,
    currentPage,
    currentPageSize,
    totalPages,
    dataTotal,
    totalPageSizes,
    getData,
    deleteData,
    Modify,
    updatePage,
    updatePageSize,
    addData,
  };
}
