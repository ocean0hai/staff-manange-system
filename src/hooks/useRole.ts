import { ref } from "vue";
import { useMessage } from "naive-ui";
import { Delete, Get } from "@/api/mothed";
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
export function useRole<T>(){
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
  async function Add() {
    
  }
  return {
    data,
    currentPage,
    currentPageSize,
    totalPages,
    dataTotal,
    totalPageSizes,
    getData,
  }
}