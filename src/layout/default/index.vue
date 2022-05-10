<template>
  <a-layout>
    <a-layout-header
      :style="{
        position: 'fixed',
        zIndex: 99,
        width: '100%',
        background: '#fff',
      }"
    >
      <AppTop />
      <AppNavBar />
    </a-layout-header>
    <a-layout-content :style="{ paddingTop: '121px' }">
      <Breadcrumb />
      <AppMain />
    </a-layout-content>
    <a-layout-footer>
      <AppFooter />
    </a-layout-footer>
    <BackTop v-model:visible="backTopvisible" />
  </a-layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  AppMain,
  AppNavBar,
  AppFooter,
  AppTop,
  Breadcrumb,
  BackTop,
} from "./components/index.js";

const backTopvisible = ref(false);

onMounted(() => {
  window.addEventListener("scroll", () => {
    const { documentElement, body } = document;
    let scrollTop = documentElement.scrollTop || body.scrollTop;
    backTopvisible.value = scrollTop > 94 ? true : false;
  });
});
</script>

<style lang="less" scoped>
.ant-layout-header {
  background: #fff;
  height: 120px;
  // line-height: inherit;
  padding: 0;
  z-index: 99 !important;
}
.main-container {
  padding-top: 133px;
}
</style>
