<template>
  <div class="about-container">
    <a-card title="关于我们" :bordered="false">
      <p>
        xlong-admin-antdv 是一套基于 Vue3 + Ant Design Vue + Bmob
        开发的单页面客户端渲染管理后台系统示例。
      </p>
      <p class="red">
        温馨提示：如果要测试删除功能，请自行添加再删除，请保留我原有的测试数据
      </p>
      <br />
      <img :src="qrcode" />
      <p class="mt-5">扫一扫，关注xLong设计</p>
      <br />
      <p class="red">*此项目做学习Vue3测试使用，请勿商用</p>
    </a-card>
  </div>
</template>
<script>
export default {
  name: "About",

  setup() {
    const qrcode = require("assets/images/qrcode.jpg");

    return {
      qrcode
    };
  }
};
</script>
<style lang="less" scoped>
.about-container {
  text-align: center;
  padding: 20px 0;
}

.red {
  color: @red;
}
</style>
