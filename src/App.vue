<template>
  <a-config-provider :locale="locale">
    <!-- <a-spin tip="系统初始化，请稍后..."> -->
      <router-view />
    <!-- </a-spin> -->
  </a-config-provider>
</template>

<script>
// 全局使用中文
import zhCN from "ant-design-vue/es/locale/zh_CN";

export default {
  setup() {
    const locale = zhCN;
    return {
      locale
    };
  }
};
</script>
