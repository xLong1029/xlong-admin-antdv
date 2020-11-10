import { Modal, message } from "ant-design-vue";
import router from "@/router";
import store from "@/store";

export default function() {
  // 建设提示语
  function showDevMoadl() {
    Modal.info({
      title: "温馨提示",
      centered: true,
      content: "功能建设中，敬请期待"
    });
  }
  function toPage(name) {
    router.push({ name });
  }
  // 注销账号
  async function logout() {
    try {
      await store.dispatch("user/logout");
      await store.dispatch("permission/generateRoutes", null);
      message.success("您已退出该系统");
      toPage("Home");
    } catch (err) {
      console.log(err);
      toPage("Home");
    }
  }

  return {
    showDevMoadl,
    logout,
    toPage
  };
}
