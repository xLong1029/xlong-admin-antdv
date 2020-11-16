<template>
  <div class="about-container">
    <a-card title="关于我们" :bordered="false">
      <p>
        此系统是基于Vue3 + Ant Desgin Vue + Bmob
        开发的单页面客户端渲染信息化管理系统示例。
      </p>
      <br />
      <img :src="qrcode" />
      <p class="mt-5">扫一扫，关注xLong设计</p>
      <a-tag color="#108ee9" class="mb-20 mt-20"
        >一个不务正业的前端工程师</a-tag
      >
      <p>QQ：381612175</p>
      <p>
        github：
        <a href="https://github.com/xLong1029/" target="_blank"
          >https://github.com/xLong1029/</a
        >
      </p>
      <p>
        站酷主页：
        <a href="http://xlong.zcool.com.cn/" target="_blank"
          >http://xlong.zcool.com.cn/</a
        >
      </p>
      <p>
        UI中国：
        <a href="http://i.ui.cn/ucenter/358591.html" target="_blank"
          >http://i.ui.cn/ucenter/358591.html</a
        >
      </p>
      <br />
      <p>*此项目做学习Vue3测试使用，有什么问题可联系我讨论</p>
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
</style>
