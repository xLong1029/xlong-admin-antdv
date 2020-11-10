<template>
  <!-- eslint-disable -->
  <div class="about-container overspread-page">
    关于我们
  </div>
</template>

<script>
/* eslint-disable */

export default {
  name: "About",
  data() {
    return {
      qrcode: require("assets/images/qrcode.jpg")
    };
  }
};
</script>
<style lang="less" scoped>
.about-container {
  text-align: center;
}
</style>
