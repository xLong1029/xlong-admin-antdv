import "babel-polyfill";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import BmobServer from "./bmob/bmob-server";
BmobServer.Init();

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

createApp(App)
  .use(store)
  .use(router)
  .use(Antd)
  .mount("#app");
