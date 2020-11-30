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
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "AppMain",
  setup() {
    const store = useStore();

    const pageLoading = computed(() => store.getters.pageLoading);

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
