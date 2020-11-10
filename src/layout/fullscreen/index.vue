<template>
  <!-- eslint-disable -->
  <div class="app-wrapper">
    <!-- <transition name="fade-transform" mode="out-in"> -->
    <!-- <router-view :key="key" /> -->
    <!-- </transition> -->

    <router-view v-slot="{ Component }">
      <transition>
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState } from "vuex";

export default {
  name: "LayoutFullScreen",
  computed: {
    key() {
      return this.$route.path;
    }
  }
};
</script>

<style lang="less" scoped>
// @import "~@/styles/index.less";

.app-wrapper {
  // .clearfix;
  // .relative;
}
</style>
