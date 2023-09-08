import type { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'

const mock:MockMethod[] = [
  //这里应该是做拦截的方法api集合
  //拦截获取数据的请求
  {
    url: "/api/getData",
    method: "get",
    response: () => {
      return {
        status: 200,
        message: "success",
        data: [],
      };
    },
  },
  //拦截获取商品的请求
  {
    url: "/api/goods",
    method: "get",
    response: () => {
      return {
        status: 200,
        message: "success",
        data: [],
      };
    },
  },
];

export default mock; //暴露，以便在src/main.ts中引入
