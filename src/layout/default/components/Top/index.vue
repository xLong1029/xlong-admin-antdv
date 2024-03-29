<template>
  <div class="top-container flex">
    <div class="wrapper-container flex">
      <div class="top-container-left">
        <span class="link flex" @click="showDevModal">
          <mail-outlined />
          <span class="hidden-xs-only">意见反馈</span>
        </span>
      </div>
      <div class="top-container-right flex">
        <span
          class="top-container-right-item hidden-xs-only link mr-10"
          @click="toPage('/about')"
        >
          关于我们
        </span>
        <span class="hidden-xs-only">|</span>
        <span
          class="top-container-right-item hidden-xs-only link mr-10"
          @click="toPage('/contact')"
        >
          联系方式
        </span>
        <template v-if="user.nickName">
          <span class="hidden-xs-only">|</span>
          <a-popover
            placement="bottom"
            trigger="hover"
            class="account-info-popover"
          >
            <template #content>
              <div class="user-info-container">
                <div class="user-info-title">
                  <span>用户信息</span>
                  <router-link to="/user/info" class="url-btn fr">
                    账户设置
                    <right-outlined />
                  </router-link>
                </div>
                <ul class="user-info-list mt-10">
                  <li class="user-info-list-item">账号：{{ user.username }}</li>
                  <li class="user-info-list-item">昵称：{{ user.nickName }}</li>
                  <li class="user-info-list-item">
                    真实姓名：{{ user.realName }}
                  </li>
                  <li class="user-info-list-item">
                    当前角色：
                    <a-tag v-if="user.roles.indexOf('admin') >= 0" color="blue"
                      >超级管理员</a-tag
                    >
                    <a-tag
                      v-if="user.roles.indexOf('manage') >= 0"
                      color="green"
                      >系统管理员</a-tag
                    >
                    <a-tag v-if="user.roles.indexOf('user') >= 0" color="orange"
                      >普通用户</a-tag
                    >
                    <span v-if="!user.roles.length">-</span>
                  </li>
                </ul>
              </div>
            </template>
            <div class="top-container-right-item link mr-5 flex">
              <span v-if="user.avatar" class="user-avatar mr-5">
                <img :src="user.avatar" />
              </span>
              <user-outlined v-else class="mr-5" />
              {{ user.nickName }}
            </div>
          </a-popover>
          <a-popconfirm
            placement="bottomRight"
            ok-text="确认"
            cancel-text="取消"
            @confirm="logout"
          >
            <template #title>
              <p>确认退出系统?</p>
            </template>
            <span class="top-container-right-item link">
              <logout-outlined class="mr-5" />注销
            </span>
          </a-popconfirm>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { message } from "ant-design-vue";
import useCommon from "common";

const { showDevModal, toPage, store, router } = useCommon();

const user = computed(() => store.getters.user);

const logout = async () => {
  try {
    await store.dispatch("user/logout");
    await store.dispatch("permission/generateRoutes", null);
    message.success("您已退出该系统");
    router.push({ name: "Home" });
  } catch (err) {
    console.log(err);
    router.push({ name: "Home" });
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
    align-items: center;
    &-item {
      margin-left: 10px;
    }
  }
}

.user-info {
  &-title {
    padding-top: 5px;
    padding-bottom: 10px;
    border-bottom: @border;

    .url-btn {
      font-size: 12px;
      margin-top: 2px;

      &:hover {
        color: @primary-color;
      }
    }
  }

  &-list {
    &-item {
      margin: 5px 0;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

.user-avatar {
  display: inline-block;
  width: 22px;
  height: 22px;
  border-radius: 11px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
