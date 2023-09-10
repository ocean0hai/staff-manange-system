import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "../mock/index";
import "virtual:uno.css";
import naive from "naive-ui";
import { setupStore } from "./store";
import router from "./router";
// 注册自定义svg组件
import "virtual:svg-icons-register";
import svgIcon from "./components/common/SvgIcon.vue";
//
async function setUpApp() {
  const app = createApp(App);
  setupStore(app);
  app.use(router);
  app.use(naive);
  app.component("svgIcon", svgIcon);
  app.mount("#app");
}
setUpApp();
