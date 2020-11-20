import "babel-polyfill";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 路由权限
import "./permission.js";

import BmobServer from "./bmob/bmob-server";
BmobServer.Init();

// 按需加载antd组件
import Antd from "ant-design-vue";

// 全局样式
import "./styles/index.less";
// 字体样式
import "./assets/font/iconfont.css";

// 按需使用图标
import {
  MailOutlined,
  UserOutlined,
  LogoutOutlined,
  SmileOutlined,
  EyeOutlined,
  DeleteOutlined,
  EditOutlined,
  RightOutlined
} from "@ant-design/icons-vue";

const app = createApp(App);
app.config.productionTip = false;

app
  .use(store)
  .use(router)
  .use(Antd);

app
  .component(MailOutlined.name, MailOutlined)
  .component(UserOutlined.name, UserOutlined)
  .component(LogoutOutlined.name, LogoutOutlined)
  .component(SmileOutlined.name, SmileOutlined)
  .component(EyeOutlined.name, EyeOutlined)
  .component(DeleteOutlined.name, DeleteOutlined)
  .component(EditOutlined.name, EditOutlined)
  .component(RightOutlined.name, RightOutlined);

app.mount("#app");
