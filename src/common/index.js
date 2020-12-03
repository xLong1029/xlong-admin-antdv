import { Modal } from "ant-design-vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

export default function() {
  const route = useRoute();
  const router = useRouter();
  const store = useStore();

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
    route,
    router,
    store,
    showDevMoadl,
    goBack,
    toPage
  };
}
