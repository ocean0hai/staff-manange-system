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
  const totalPages = ref<number>(20); //总页数
  const dataTotal = ref<number>(0); //总的条数
  async function getData() {
    try {
      const res = await Get<dataType<T>>(mothed.getPath);
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
      const res: any = await Delete(mothed.deletePath +id);
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
  async function Add(params: any) {
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
  onMounted(async () => {
    await getData();
  });
  return {
    data,
    currentPage,
    totalPages,
    dataTotal,
    deleteData,
    Modify,
    Add,
  };
}
