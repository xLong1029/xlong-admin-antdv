<template>
  <a-layout>
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%', background: '#fff' }">
      <app-top />
      <app-nav-bar />
    </a-layout-header>
    <a-layout-content :style="{ paddingTop: '121px' }">
      <breadcrumb />
      <app-main />
    </a-layout-content>
    <a-layout-footer>
      <app-footer />
    </a-layout-footer>
    <back-top v-model:visible="backTopvisible" />
  </a-layout>
</template>

<script>
import { ref, onMounted } from "vue";
import {
  AppMain,
  AppNavBar,
  AppFooter,
  AppTop,
  Breadcrumb,
  BackTop
} from "./components/index.js";

export default {
  name: "LayoutDefault",
  components: {
    AppMain,
    AppNavBar,
    AppFooter,
    AppTop,
    Breadcrumb,
    BackTop
  },
  setup() {
    const backTopvisible = ref(false);

    onMounted(() => {
      window.addEventListener("scroll", () => {
        const { documentElement, body } = document;
        let scrollTop = documentElement.scrollTop || body.scrollTop;
        backTopvisible.value = scrollTop > 94 ? true : false;
      });
    });

    return {
      backTopvisible
    };
  }
};
</script>

<style lang="less" scoped>
.ant-layout-header {
  background: #fff;
  height: 120px;
  line-height: inherit;
  padding: 0;
  z-index: 99 !important;
}
.main-container {
  padding-top: 133px;
}
</style>
