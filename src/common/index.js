import { Modal } from "ant-design-vue";
import router from "router";

export default function() {
  function showDevMoadl() {
    Modal.info({
      title: "温馨提示",
      centered: true,
      content: "功能建设中，敬请期待"
    });
  }

  function goBack() {
    router.go(-1);
  }

  function toPage(path) {
    router.push({ path });
  }

  return {
    showDevMoadl,
    goBack,
    toPage
  };
}
