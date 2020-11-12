<template>
  <div class="breadcrumb-container">
    <div class="wrapper-container">
      <div class="breadcrumb-container-wrapper">
        <span class="fl">当前位置：</span>
        <a-breadcrumb>
          <a-breadcrumb-item href>首页</a-breadcrumb-item>
        </a-breadcrumb>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Breadcrumb"
};
</script>

<style lang="less" scoped>
.breadcrumb {
  &-container {
    position: relative;
    z-index: 50;
    background: #e4e4e4;
    padding: 10px 0;
  }
}
</style>
