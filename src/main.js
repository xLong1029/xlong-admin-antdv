import "babel-polyfill";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import BmobServer from "./bmob/bmob-server";
BmobServer.Init();

// 按需加载antd组件
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.less";

// 按需使用图标
import { MailOutlined, RightOutlined } from "@ant-design/icons-vue";

const app = createApp(App);
app.config.productionTip = false;

app
  .use(store)
  .use(router)
  .use(Antd);

app
  .component(MailOutlined.name, MailOutlined)
  .component(RightOutlined.name, RightOutlined);

app.mount("#app");
