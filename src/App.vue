<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>

<script>
// 全局使用中文
import zhCN from "ant-design-vue/es/locale/zh_CN";

export default {
  data() {
    return {
      locale: zhCN
    };
  }
};
</script>
