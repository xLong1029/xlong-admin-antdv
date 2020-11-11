<template>
  <a-layout>
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <app-top />
      <!-- <nav-bar /> -->
    </a-layout-header>
    <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
      <app-main />
    </a-layout-content>
    <a-layout-footer>
      <app-footer />
    </a-layout-footer>
  </a-layout>
</template>

<script>
/* eslint-disable */
import { AppMain, Navbar, AppFooter, AppTop, Breadcrumb, BackTop } from "./components";

export default {
  name: "LayoutDefault",
  components: {
    AppMain,
    Navbar,
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
}
.main-container {
  padding-top: 133px;
}

.header-container {
  .header-shadow {
    // background: url(../../assets/images/header_shadow.png) no-repeat top center;
    position: absolute;
    top: 133px;
    left: 0;
    right: 0;
    height: 60px;
    z-index: 0;
  }
}

@media screen and (max-width: 768px) {
  .main-container {
    padding-top: 112px;
  }

  .header-container {
    .header-shadow {
      display: none;
    }
  }
}
</style>
