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
export default {
  name: "AppMain"
};
</script>

<style lang="less" scoped>
.app-main {
  min-height: calc(100vh - 301px);
  position: relative;
  overflow: hidden;
}
</style>
