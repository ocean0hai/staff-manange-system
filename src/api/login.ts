import { api } from "./request";
export async function login(data: any) {
  let isLogin = false;
  await api
    .post("/user/login", {
      ...data,
    })
    .then(() => {
      localStorage.removeItem("codetoken");
      console.log('登录成功！！');
      isLogin = true;
    })
    .catch((res) => {
      console.log("登录失败！", res);
    });
  return isLogin;
}
export function register(data: any) {
  api.post("/user/register", {
    ...data,
  });
}
