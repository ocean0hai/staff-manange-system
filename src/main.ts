import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "../mock/index";
import "virtual:uno.css";
import naive from "naive-ui";
import { setupRouter } from "./router";
import { setupStore } from "./store";
// 注册自定义svg组件
import 'virtual:svg-icons-register';
import svgIcon from './components/common/SvgIcon.vue';
//
async function setUpApp() {
  const app = createApp(App);
  await setupRouter(app);
  setupStore(app);
  app.use(naive);
  app.component('svgIcon', svgIcon);
  app.mount("#app");
}
setUpApp();
