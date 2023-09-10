import type { MockMethod } from "vite-plugin-mock";
import { Random } from "mockjs";
interface objType {
  [key: string]: any;
}
const user = {
  id: "1",
  username: "2",
  status: "3",
  time: "4",
};
// type Mapping<Obj extends object> = {
//   [Key in keyof Obj]: Obj[Key];
// };
function craeteData(obj: objType) {
  const data = [];
  for (let i = 0; i < 10; i++) {
    for (let key in obj) {
      obj[key] = i + "";
    }
    data.push({
      ...obj,
    });
  }
}
const mock: MockMethod[] = [
  //这里应该是做拦截的方法api集合
  //用户信息接口
  {
    url: "/api/user",
    method: "get",
    response: () => {
      return {
        code: 200,
        message: "success",
        data: [user],
      };
    },
  },
];

export default mock; //暴露，以便在src/main.ts中引入
