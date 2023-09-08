import { defineStore } from "pinia"
import { api } from "@/utils/request-code"
const loginStore=defineStore('loginStore',()=>{

    async function getImg(){
        const img= await  api.get('/api/user/codeImage')
     }

    return{

    }
})