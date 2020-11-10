<template>
  <!-- eslint-disable -->
  <div class="app-wrapper">
    <div class="main-container">
      <header class="header-container">
        <app-top />
        <!-- <navbar /> -->
      </header>
      <!-- <breadcrumb v-if="breadcrumbVisible" class="breadcrumb-container" /> -->
      <app-main />
      <!-- <app-footer /> -->
    </div>
    <!-- <back-top :visible="backTopvisible" /> -->
  </div>
</template>

<script>
/* eslint-disable */
import {
  AppMain,
  Navbar,
  AppFooter,
  AppTop,
  Breadcrumb,
  BackTop
} from "./components";

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
// @import "~@/styles/index.less";

.app-wrapper {
  // .clearfix;
  // .relative;
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
