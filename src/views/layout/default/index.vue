<template>
  <a-layout>
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <app-top />
      <app-nav-bar />
    </a-layout-header>
    <a-layout-content :style="{ marginTop: '121px' }">
      <breadcrumb />
      <app-main />
    </a-layout-content>
    <a-layout-footer>
      <app-footer />
    </a-layout-footer>
  </a-layout>
</template>

<script>
/* eslint-disable */
import {
  AppMain,
  AppNavBar,
  AppFooter,
  AppTop,
  Breadcrumb,
  BackTop
} from "./components";

export default {
  name: "LayoutDefault",
  components: {
    AppMain,
    AppNavBar,
    AppFooter,
    AppTop,
    Breadcrumb,
    BackTop
  }
};
</script>

<style lang="less" scoped>
.ant-layout-header {
  background: #fff;
  height: auto;
  line-height: inherit;
  padding: 0;
}
.main-container {
  padding-top: 133px;
}
</style>
