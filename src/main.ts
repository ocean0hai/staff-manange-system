import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "../mock/index";
import "virtual:uno.css";
import naive from "naive-ui";
import router from "./router";
import { createPinia } from "pinia";
// 注册自定义svg组件
import "virtual:svg-icons-register";
import svgIcon from "./components/common/SvgIcon.vue";
async function setUpApp() {
  const app = createApp(App);
  const pinia = createPinia();
  app.use(router);
  app.use(pinia);
  app.use(naive);
  app.component("svgIcon", svgIcon);
  app.mount("#app");
}
setUpApp();
