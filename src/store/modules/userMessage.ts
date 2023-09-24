import { userType } from '@/type/admin';
import { api } from "@/api/request";
import { defineStore } from "pinia";
import { ref } from "vue";

export const userMessage = defineStore("userMessage", () => {
  const userMes = ref<userType>();
  async function getUserMessage() {
    await api.get("/user/getCurrentUser").then((res: any) => {
      if (res.code === 200) {
        userMes.value = { ...res.data };
      }
    });  
  }
  return {
    userMes,
    getUserMessage,
  };
});
