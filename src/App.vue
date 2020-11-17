<template>
  <a-spin :spinning="sysLoading" tip="系统初始化，请稍后..." class="app-spin">
    <a-config-provider :locale="locale">
      <router-view />
    </a-config-provider>
  </a-spin>
</template>

<script>
// 全局使用中文
import zhCN from "ant-design-vue/es/locale/zh_CN";
import { computed, getCurrentInstance } from "vue";
import { logInfo } from "utils";

export default {
  setup() {
    const locale = zhCN;

    // vue 实例
    const { ctx } = getCurrentInstance();

    // 通过计算属性获取store的值
    const currentEnv = computed(() => ctx.$store.getters.currentEnv);
    const sysLoading = computed(() => ctx.$store.getters.sysLoading);

    console.log(`current environment is ${currentEnv.value}`);

    if (window.performance.navigation.type === 1) {
      logInfo("页面被刷新");
    } else {
      logInfo("首次进入页面");
    }

    return {
      locale,
      sysLoading
    };
  }
};
</script>
<style lang="less">
.app-spin {
  max-height: 100vh !important;
  height: 100vh !important;
}
</style>
