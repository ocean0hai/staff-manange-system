import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
export const routes: RouteRecordRaw[] = [
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
        name: "notice",
        path: "notice",
        component: () => import("@/pages/admin/NoticeManage.vue"),
      },
      {
        name: "position",
        path: "position",
        component: () => import("@/pages/admin/PositionManage.vue"),
      },
      {
        name: "staff",
        path: "staff",
        component: () => import("@/pages/admin/StaffManage.vue"),
      },
      {
        name: "roleManage",
        path: "roleManage",
        component: () => import("@/pages/admin/RoleManage.vue"),
      },
      {
        name: "roleAuthority",
        path: "roleAuthority",
        component: () => import("@/pages/admin/RoleAuthority.vue"),
      },
      {
        name: "userrole",
        path: "userrole",
        component: () => import("@/pages/admin/UserRole.vue"),
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
