import { Modal } from "ant-design-vue";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

export default function() {
  const route = useRoute();
  const router = useRouter();

  const store = useStore();

  // 页面加载
  const pageLoading = computed(() => store.getters.pageLoading);

  /**
   * 设置页面加载Loading
   *
   * @param {String} val 加载值
   */
  function setPageLoding(val) {
    store.dispatch("app/setPageLoading", val);
  }

  /**
   * 显示开发提示框
   */
  function showDevMoadl() {
    Modal.info({
      title: "温馨提示",
      centered: true,
      content: "功能建设中，敬请期待"
    });
  }

  /**
   * 返回上一页
   */
  function onGoBack() {
    router.go(-1);
  }

  /**
   * 跳转页面路径
   */
  function toPage(path) {
    router.push({ path });
  }

  return {
    route,
    router,
    store,
    pageLoading,
    setPageLoding,
    showDevMoadl,
    onGoBack,
    toPage
  };
}
