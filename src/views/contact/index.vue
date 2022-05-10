<template>
  <div class="contact-container">
    <a-card title="联系方式" :bordered="false">
      <a-tag color="#108ee9" class="mb-20">
        一个不务正业的前端工程师
      </a-tag>
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
    </a-card>
  </div>
</template>

<script>
export default {
  name: "Contact"
};
</script>

<style lang="less" scoped>
.contact-container {
  text-align: center;
  padding: 20px 0;
}
</style>
