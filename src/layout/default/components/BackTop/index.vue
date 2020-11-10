<template>
  <!-- eslint-disable -->
  <a class="back-top-btn" :class="{ 'visible': visible }" @click="toTop">
    返回顶部
    <i class="el-icon-caret-top ml-5"></i>
  </a>
</template>

<script>
/* eslint-disable */
// 工具
import { scrollTo } from "utils/scroll-to.js";

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toTop() {
      scrollTo(0);
    }
  }
};
</script>

<style lang="less" scoped>
.back-top-btn {
  position: fixed;
  transform: translateZ(0);
  background-color: #f07057;
  color: #fff;
  border-radius: 4px;
  font-size: 14px;
  width: auto;
  height: auto;
  padding: 8px 18px;
  right: 20px;
  bottom: -40px;
  transition: all 0.2s;
  z-index: 99;

  &.visible {
    bottom: 15px;
  }
}
</style>
