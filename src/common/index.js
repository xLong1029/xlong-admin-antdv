import { Modal } from "ant-design-vue";

export default function() {
  function showDevMoadl() {
    Modal.info({
      title: "温馨提示",
      centered: true,
      content: "功能建设中，敬请期待"
    });
  }

  return {
    showDevMoadl
  };
}
