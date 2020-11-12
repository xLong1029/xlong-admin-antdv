<template>
  <!-- eslint-disable -->
  <footer class="footer-container">
    <div class="wrapper-container">
      <a-row :gutter="10" type="flex" justify="space-between">
        <a-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
          <div class="footer-info">
            <a-row :gutter="10" class="contact flex">
              <a-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="contact-item">
                <p>QQ：381612175</p>
                <p>
                  github：
                  <a
                    href="https://github.com/xLong1029/"
                    target="_blank"
                  >https://github.com/xLong1029/</a>
                </p>
              </a-col>
              <a-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="contact-item">
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
              </a-col>
            </a-row>
          </div>
        </a-col>
        <a-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
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
  setup() {
    const qrcodeList = [
      {
        imgUrl: require("assets/images/qrcode.jpg"),
        title: "xLong设计"
      }
    ];
    return {
      qrcodeList
    };
  }
};
</script>

<style lang="less" scoped>
.footer-container {
  background: #292f38;
  padding: 15px 0;
  color: #87919f;
  font-size: 12px;
}

.contact {
  margin-top: 25px;
  &-item {
    p {
      margin-bottom: 20px;
    }
  }
}

.qrcode-list {
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

@media (max-width: 576px) {
  .contact {
    text-align: center;
  }
}

@media (max-width: 768px) {
  .qrcode-list {
    justify-content: center;
    &-item {
      width: 120px;

      &__img {
        width: 120px;
        height: 120px;
      }
    }
  }
}
</style>
