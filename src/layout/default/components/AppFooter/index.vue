<template>
  <!-- eslint-disable -->
  <footer class="footer-container">
    <div class="wrapper-container">
      <a-row type="flex" justify="space-between">
        <a-col :span="4">col-4</a-col>
        <a-col :span="4">col-4</a-col>
        <a-col :span="4">col-4</a-col>
        <a-col :span="4">col-4</a-col>
      </a-row>
      <!-- <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="footer-info">
            <table class="info-table">
              <tr>
                <td class="info-table__td-label">备案号：</td>
                <td colspan="3">桂ICP备 17001734 号</td>
              </tr>
              <tr>
                <td class="info-table__td-label">主办：</td>
                <td colspan="3">南宁市自然资源局</td>
              </tr>
              <tr>
                <td class="info-table__td-label">承办：</td>
                <td>南宁市不动产登记中心</td>
                <td class="info-table__td-label">业务咨询电话：</td>
                <td>0771-3198123</td>
              </tr>
              <tr>
                <td class="info-table__td-label">技术支持：</td>
                <td colspan="3">南宁市自然资源信息中心</td>
              </tr>
              <tr>
                <td class="info-table__td-label">办公地址：</td>
                <td>南宁市锦春路3-1号（金洲锦春路口）</td>
                <td class="info-table__td-label">邮编：</td>
                <td>530021</td>
              </tr>
            </table>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="footer-qrcode">
            <ul class="qrcode-list flex">
              <li class="qrcode-list-item flex" v-for="(item, index) in qrcodeList" :key="index">
                <img class="qrcode-list-item__img" :src="item.imgUrl" />
                <span class="qrcode-list-item__title">{{ item.title }}</span>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row> -->
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
        // {
        //   imgUrl: require("@/assets/qrcode-images/appdownloadNew2.png"),
        //   title: "邕e登APP"
        // },
        // {
        //   imgUrl: require("@/assets/qrcode-images/nnbdc_weixin.jpg"),
        //   title: "南宁市不动产登记中心微信公众号"
        // },
        // {
        //   imgUrl: require("@/assets/qrcode-images/nngeo_weixin.jpg"),
        //   title: "南宁市自然资源信息中心微信公众号"
        // }
      ]
    };
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.footer-container {
  background: #292f38;
  padding: 15px 0 20px 0;
  color: #87919f;
  font-size: 12px;
}

.info-table {
  width: 100%;
  padding: 30px 0;

  td {
    padding: 3px;

    &.info-table__td-label {
      text-align: right;
      padding-left: 10px;
    }
  }
}

.qrcode-list {
  margin-right: 10px;
  margin-top: 10px;
  justify-content: space-around;
  &-item {
    flex-direction: column;
    text-align: center;
    width: 135px;
    margin: 0 15px;

    &__img {
      width: 135px;
      height: 135px;
    }

    &__title {
      margin-top: 10px;
    }
  }
}
</style>
