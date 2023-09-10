import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/admin", //重定向，当使用  "/  ",重新使用  "/home  "
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/Login.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    redirect: "/admin/user",
    component: () => import("@/pages/Admin.vue"),
    children: [
      {
        name: "user",
        path: "user",
        component: () => import("@/pages/admin/UserManage.vue"),
      },
      {
        name: "department",
        path: "department",
        component: () => import("@/pages/admin/Department.vue"),
      },
      {
        name: "download",
        path: "download",
        component: () => import("@/pages/admin/Download.vue"),
      },
      {
        name: "download",
        path: "download",
        component: () => import("@/pages/admin/Download.vue"),
      },
    ],
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/pages/404.vue"),
  },
];
const router = createRouter({
  // hash 或者 history 模式
  history: createWebHashHistory(),
  routes: routes,
});

export default router;
