<template>
  <div class="top-container flex">
    <div class="wrapper-container flex">
      <div class="top-container-left">
        <span class="link flex" @click="showDevMoadl">
          <MailOutlined />
          <span>意见反馈</span>
        </span>
      </div>
      <div class="top-container-right">
        <span class="top-container-right-item link" @click="toPage('About')">
          关于我们
          <RightOutlined />
        </span>
        <span class="top-container-right-item link" @click="toPage('Contact')">
          联系方式
          <RightOutlined />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from "vuex";
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { createVNode } from 'vue';
import common from "common/index.js";

export default {
  name: "AppTop",
  setup() {
    const { showDevMoadl, toPage } = common();
    return {
      showDevMoadl,
      toPage
    }
  }
};
</script>

<style lang="less" scoped>
.top-container {
  display: flex;
  background: #ffffff;
  width: 100%;
  color: #999;
  font-size: 12px;
  border-bottom: #eee 1px solid;

  .wrapper-container {
    justify-content: space-between;
    align-items: center;
    height: 40px;
  }

  .link {
    align-items: center;
    &:hover {
      color: @primary-color;
      cursor: pointer;
    }
  }

  &-left {
    .anticon-mail {
      margin-right: 5px;
    }
  }

  &-right {
    &-item {
      margin-left: 10px;
    }
  }
}
</style>
