import { apitest } from "@/utils/request-code";
export function login(data) {
  apitest.post("/api/user/login", {
    ...data,
  });
}
export function register(data) {
  apitest.post("/api/user/register", {
    ...data,
  });
}
