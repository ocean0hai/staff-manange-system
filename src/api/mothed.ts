import { api } from "./request";
// Res是返回的参数，T是泛型，需要自己定义，返回对数统一管理***
type Res<T> = Promise<ItypeAPI<T>>;
// 一般情况下响应数据返回的这三个参数，
// 但不排除后端返回其它的可能性，
interface ItypeAPI<T> {
  data: T; //请求的数据，用泛型
  message: string | null; // 返回状态码的信息，如请求成功等
  code: number; //返回后端自定义的200，404，500这种状态码
}
//得到
export async function Get<T>(path: string): Res<T[]> {
  return await api.get("/api/" + path);
}
export function Post(path: string, data: any) {
  return api.post(path, data);
}
export function Delete(path: string){
  return api.delete(path);
}
export function Put(path: string, data: any){
  return api.put(path, data);
}
