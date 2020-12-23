<template>
  <a-spin :spinning="pageLoading" tip="加载中，请稍后...">
    <section
      id="appMain"
      class="app-main"
      :spinning="pageLoading"
      tip="加载中，请稍后..."
    >
      <div class="wrapper-container">
        <router-view v-slot="{ Component }">
          <transition mode="out-in" name="fade-transform">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </section>
  </a-spin>
</template>

<script>
// 通用方法
import common from "common";

export default {
  name: "AppMain",
  setup() {
    const { pageLoading } = common();

    return {
      pageLoading
    };
  }
};
</script>

<style lang="less" scoped>
.app-main {
  min-height: calc(100vh - 301px);
  position: relative;
  overflow: hidden;
}
</style>
