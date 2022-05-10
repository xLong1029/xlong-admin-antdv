import axios from "axios";
import { message } from "ant-design-vue";
import store from "@/store";

export function handelRequestError(error) {
  switch (error.response.status) {
    case 401:
      message.error("未授权！请重新登录");
      setTimeout(() => {
        store.dispatch("user/logout");
      }, 500);
      break;
    case 403:
      message.error(error.response.content);
      break;
    case 500:
      message.error("系统繁忙");
      break;
    default:
      break;
  }
}

export function configSetting(config) {
  config.headers["Content-Type"] = "application/json";

  if (store.getters.token) {
    config.headers["Authorization"] = "Bearer " + store.getters.token;
  }
  return config;
}

const service = axios.create({
  baseURL: "", // url = base url + request url
  timeout: 30000
});

service.interceptors.request.use(
  config => {
    return configSetting(config);
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    const res = response.data;
    return res;
  },
  error => {
    if (error && error.response) {
      handelRequestError(error);
    }
    return Promise.reject(error);
  }
);

export default service;
