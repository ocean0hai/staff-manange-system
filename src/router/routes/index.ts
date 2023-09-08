export const routes: Array<any> = [
  {
    path: "/",
    redirect: "/login", //重定向，当使用  "/  ",重新使用  "/home  "
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/Login.vue"),
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/pages/404.vue"),
  },
];