<template>
  <!-- eslint-disable -->
  <footer class="footer-container">
    <div class="wrapper-container">
      <a-row :gutter="10" type="flex" justify="space-between">
        <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="footer-info">
            <div class="contact flex mt-5">
              <div class="contact-item mr-30">
                <p>QQ：381612175</p>
                <p>
                  github：
                  <a
                    href="https://github.com/xLong1029/"
                    target="_blank"
                  >https://github.com/xLong1029/</a>
                </p>
              </div>
              <div class="contact-item">
                <p>
                  站酷主页：
                  <a
                    href="http://xlong.zcool.com.cn/"
                    target="_blank"
                  >http://xlong.zcool.com.cn/</a>
                </p>
                <p>
                  UI中国：
                  <a
                    href="http://i.ui.cn/ucenter/358591.html"
                    target="_blank"
                  >http://i.ui.cn/ucenter/358591.html</a>
                </p>
              </div>
            </div>
          </div>
        </a-col>
        <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="footer-qrcode">
            <ul class="qrcode-list flex">
              <li class="qrcode-list-item flex" v-for="(item, index) in qrcodeList" :key="index">
                <img class="qrcode-list-item__img" :src="item.imgUrl" />
                <span class="qrcode-list-item__title">{{ item.title }}</span>
              </li>
            </ul>
          </div>
        </a-col>
      </a-row>
    </div>
  </footer>
</template>

<script>
/* eslint-disable */

export default {
  name: "AppFooter",
  data() {
    return {
      qrcodeList: [
        {
          imgUrl: require("assets/images/qrcode.jpg"),
          title: "xLong设计"
        }
      ]
    };
  },
  methods: {}
};
</script>

<style lang="less">
.ant-layout-footer {
  padding: 0;
}

.footer-container {
  background: #292f38;
  padding: 15px 0 20px 0;
  color: #87919f;
  font-size: 12px;
}

.qrcode-list {
  margin-right: 10px;
  margin-top: 10px;
  justify-content: flex-end;
  &-item {
    flex-direction: column;
    text-align: center;
    width: 80px;
    margin: 0 15px;

    &__img {
      width: 80px;
      height: 80px;
    }

    &__title {
      margin-top: 10px;
    }
  }
}
</style>
