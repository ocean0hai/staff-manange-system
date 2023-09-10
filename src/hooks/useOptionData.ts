import { onMounted, ref } from "vue";
import { Delete, Get, Post, Put } from "@/api/mothed";
import { useMessage } from "naive-ui";
interface mothedType {
  getPath: string;
  postPath: string;
  putPath: string;
  deletePath: string;
}
export function useOptionData<T>(mothed: mothedType) {
  const data = ref<T[]>();
  const message = useMessage();
  async function getData() {
    try {
      await Get<T>(mothed.getPath).then((res) => {
        if (res.code === 200) {
          data.value = [...res.data];
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
  async function deleteData() {
    await Delete(mothed.deletePath).then(() => {
      message.success("删除成功！");
    });
  }
  async function Modify(params: any) {
    await Put(mothed.putPath, params).then(() => {
      message.success("修改成功！");
    });
  }
  async function Add(params:any) {
   await Post(mothed.postPath,params).then(()=>{
    message.success('添加成功！')
   })
  }
  onMounted(async () => {
    await getData();
  });
  return {
    data,
    deleteData,
    Modify,
    Add
  };
}
