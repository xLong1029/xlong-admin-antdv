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
import { getCurrentInstance, computed } from "vue";

export default {
  name: "AppMain",
  setup() {
    const { ctx } = getCurrentInstance();

    const pageLoading = computed(() => ctx.$store.getters.pageLoading);

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
