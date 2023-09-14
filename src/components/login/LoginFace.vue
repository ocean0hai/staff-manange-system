<template>
  <div>
    <FaceImge @get-img="submitData"></FaceImge>
  </div>
</template>

<script setup lang="ts">
import { Post } from "@/api/mothed";
import FaceImge from "@/components/common/FaceImg.vue";
import { useMessage } from "naive-ui";
import { useRouter } from "vue-router";
const router=useRouter()
const message=useMessage()
async function submitData(str:string){

  // await Post('fdsaf',{
  //   img:str
  // }).then((res:any)=>{
  //   if (res.code===200) {
  //     router.push({name:'user'})
  //   }else{
  //    message.error('验证失败！') 
  //   }
  // }) 
}
</script>
<style scoped></style>
