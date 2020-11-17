<template>
  <div class="top-container flex">
    <div class="wrapper-container flex">
      <div class="top-container-left">
        <span class="link flex" @click="showDevMoadl">
          <MailOutlined />
          <span>意见反馈</span>
        </span>
      </div>
      <div class="top-container-right flex">
        <span class="top-container-right-item link mr-10" @click="toPage('/about')">
          关于我们
        </span>
        |
        <span class="top-container-right-item link mr-10" @click="toPage('/contact')">
          联系方式
        </span>
        <template v-if="user.realName">
          |
          <a-popover placement="bottom" trigger="hover" class="account-info-popover">
            <template #content>
              <div class="user-info-container">
                <div class="user-info-title">
                  <span>用户信息</span>
                  <router-link to="/user/info" class="url-btn fr">
                    账户设置
                    <RightOutlined />
                  </router-link>
                </div>
                <ul class="user-info-list mt-10">
                  <li class="user-info-list-item">账号：{{ user.username }}</li>
                  <li class="user-info-list-item">真实姓名：{{ user.realName }}</li>
                  <li class="user-info-list-item">
                    当前角色：
                    <a-tag v-if="user.roles.indexOf('admin') >= 0" color="blue">超级管理员</a-tag>
                    <a-tag v-if="user.roles.indexOf('manage') >= 0" color="green">系统管理员</a-tag>
                    <a-tag v-if="user.roles.indexOf('editor') >= 0" color="orange">普通用户</a-tag>
                    <span v-if="!user.roles.length">-</span>
                  </li>
                </ul>
              </div>
            </template>
            <div class="top-container-right-item link mr-5 flex">
              <span v-if="user.avatar" class="user-avatar mr-5">
                <img :src="user.avatar" />
              </span>
              <UserOutlined v-else />
              {{ user.realName }}
            </div>
          </a-popover>
          <a-popconfirm placement="bottomRight" ok-text="确认" cancel-text="取消" @confirm="logout">
            <template #title>
              <p>确认退出系统?</p>
            </template>
            <span class="top-container-right-item link">
              <LogoutOutlined class="mr-5" />注销
            </span>
          </a-popconfirm>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, computed } from "vue";
import common from "common/index.js";

export default {
  name: "AppTop",
  setup() {
    const { showDevMoadl } = common();

    const { ctx } = getCurrentInstance();

    const user = computed(() => ctx.$store.getters.user);

    const toPage = path => {
      ctx.$router.push({ path });
    };

    const logout = async () => {
      try {
        await ctx.$store.dispatch("user/logout");
        await ctx.$store.dispatch("permission/generateRoutes", null);
        ctx.$message.success("您已退出该系统");
        ctx.$router.push({ name: "Home" });
      } catch (err) {
        console.log(err);
        ctx.$router.push({ name: "Home" });
      }
    };

    return {
      showDevMoadl,
      toPage,
      user,
      logout
    };
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

  img{
    width: 100%;
    height: 100%;
  }
}
</style>
