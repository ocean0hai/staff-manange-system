import { apitest } from "@/utils/request-code";
export function login(data:any) {
  apitest.post("/api/user/login", {
    ...data,
  });
}
export function register(data:any) {
  apitest.post("/api/user/register", {
    ...data,
  });
}
