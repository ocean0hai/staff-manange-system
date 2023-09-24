import { api } from "./request";
export async function login(data: any) {
  let str = "";
  await api
    .post("/user/login", {
      ...data,
    })
    .then((res: any) => {
      switch (res.code) {
        case 200: {
          str = "1";
          localStorage.removeItem("codetoken");
          console.log(res.message);
          break;
        }
        default: {
          str=res.message
        }
      }
    });
  return str
}
export function register(data: any) {
  api.post("/user/register", {
    ...data,
  });
}
