<template>
  <section id="appMain" class="app-main">
    <div class="wrapper-container">
      <router-view v-slot="{ Component }">
        <transition mode="out-in" name="fade-transform">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </section>
</template>

<script>
/* eslint-disable */
export default {
  name: "AppMain",
  computed: {
    key() {
      return this.$route.path;
    }
  }
};
</script>

<style lang="less">
.app-main {
  // margin-top: 133px;
  // min-height: calc(100vh - 80px);
  position: relative;
  overflow: hidden;
}
</style>
