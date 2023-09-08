import { createRouter, createWebHistory } from "vue-router";
import type { App } from "vue";
import { routes } from "./routes";
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export async function setupRouter(app: App) {
  app.use(router);
  await router.isReady();
}
