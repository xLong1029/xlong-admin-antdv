<template>
  <!-- eslint-disable -->
  <div class="top-container fixed flex">
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

  &.fixed {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
  }

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

      .el-icon-s-custom {
        margin-right: 2px;
      }
    }
  }
}

.user-info {
  &-title {
    padding-top: 5px;
    padding-bottom: 10px;
    border-bottom: @border;

    .url-btn {
      &:hover {
        color: @primary-color;
      }
    }
  }

  &-list {
    &-item {
      margin: 10px 0;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
