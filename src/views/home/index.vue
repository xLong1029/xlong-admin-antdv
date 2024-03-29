<template>
  <div class="home-container">
    <h1 class="home-title">
      <strong class="mr-10">欢迎使用</strong>
      {{ systemTitle }}
    </h1>
    <p class="home-subtitle mt-20">
      为了实现对XXX信息化服务的牛逼功能，我们在此为广大群众提供在线服务，欢迎大家使用，并对我们的服务提出宝贵的意见（没错，是编的，不用太认真），
      <a @click="openOperationManual()"
        >演示的账号密码在操作手册中，请自行查阅。</a
      >
    </p>
    <div class="home-content mt-20">
      <div class="banner-user">
        <a-row :gutter="10">
          <a-col :xs="24" :sm="24" :md="16" :lg="18" :xl="18" class="mt-20">
            <!-- 轮播图 -->
            <div class="banner-container">
              <a-carousel autoplay>
                <div
                  v-for="(item, index) in bannerList"
                  :key="'banner' + index"
                >
                  <img class="banner__img" :src="item.imgUrl" />
                </div>
              </a-carousel>
            </div>
          </a-col>
          <a-col :xs="24" :sm="24" :md="8" :lg="6" :xl="6" class="mt-20">
            <!-- 登录部分 -->
            <div class="login-container">
              <div class="login-title">
                {{ nickName ? "欢迎您" : "用户登录" }}
              </div>
              <template v-if="nickName">
                <div class="login-content">
                  <p>尊敬的{{ nickName }}：</p>
                  <p class="welcome">
                    您好，欢迎使用{{ systemTitle }}，进入
                    <router-link
                      style="text-decoration: underline"
                      to="/user/index"
                      >用户中心</router-link
                    >。
                  </p>
                </div>
                <div class="login-btn-container">
                  <a-button
                    type="primary"
                    @click="toPage('/user/change-password')"
                    class="mr-10"
                    >修改密码</a-button
                  >
                  <a-button @click="logout()">退出登录</a-button>
                </div>
              </template>
              <template v-else>
                <div class="login-content mt-10">
                  <a-form
                    ref="loginForm"
                    :model="form"
                    :rules="rules"
                    :label-col="{ span: 24 }"
                    :wrapper-col="{ span: 24 }"
                  >
                    <a-form-item label="手机号码" name="username">
                      <a-input
                        v-model:value="form.username"
                        placeholder="请输入手机号码"
                        @keyup.enter="onSubmit"
                      />
                    </a-form-item>
                    <a-form-item label="密码" name="password">
                      <a-input-password
                        v-model:value="form.password"
                        placeholder="请输入密码"
                        @keyup.enter="onSubmit"
                      />
                    </a-form-item>
                  </a-form>
                  <div class="password-container flex">
                    <a-checkbox
                      v-model:checked="remeberPwd"
                      class="password-remember"
                      >记住密码</a-checkbox
                    >
                    <span class="password-forget" @click="forgetPassword()"
                      >忘记密码？</span
                    >
                  </div>
                  <div class="login-btn-container">
                    <a-button
                      type="primary"
                      @click="onSubmit"
                      :loading="submitLoading"
                      class="mr-10"
                      >登录</a-button
                    >
                    <a-button @click="showDevModal()">注册</a-button>
                  </div>
                </div>
              </template>
            </div>
          </a-col>
        </a-row>
      </div>
      <!-- 操作指南 -->
      <div class="operation-guide mt-20">
        <a-row :gutter="10">
          <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="operation-guide__item">
              <div class="guide-container">
                <h4><i class="iconfont icon-book"></i>操作手册下载地址</h4>
                <div>
                  <a
                    target="_blank"
                    type="primary"
                    @click="openOperationManual()"
                    >{{ systemTitle }}操作手册</a
                  >
                </div>
              </div>
            </div>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="operation-guide__item">
              <div class="browser-container">
                <h4>
                  <i class="iconfont icon-liulanqi"></i>网页推荐使用浏览器
                </h4>
                <div>
                  <a
                    href="https://www.google.cn/intl/zh-CN/chrome/?standalone=1"
                    target="_blank"
                    >下载谷歌浏览器</a
                  >
                </div>
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
      <hr />
    </div>
  </div>
</template>

<script setup>
import {
  computed,
  reactive,
  toRaw,
  ref,
  watch,
  createVNode,
  onMounted,
  h,
} from "vue";
import { message, Modal } from "ant-design-vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
// 通用模块
import common from "common";
// 工具
import {
  setLocalS,
  getLocalS,
  delLocalS,
  AESEncrypt,
  AESDecrypt,
  strToArr,
} from "utils";

const { showDevModal, toPage, store, router } = common();

// 是否记住密码
const remeberPwd = ref(false);

// 监听记住密码与token的改变
watch(
  () => [remeberPwd.value, store.getters.token],
  ([newRemeberPwd, newToken], [oldRemeberPwd, oldToken]) => {
    console.log(newRemeberPwd, newToken, oldRemeberPwd, oldToken);
    if (!newRemeberPwd && getLocalS("username")) {
      delLocalS("username");
      delLocalS("password");
    }

    // 退出登录
    if (!newRemeberPwd && !newToken) {
      form.username = "";
      form.password = "";
    }
  }
);

// 提交loading
const submitLoading = ref(false);

const loginForm = ref(null);

// 系统名称
const systemTitle = process.env.VUE_APP_SYSYTEM_TITLE;

// 当前用户昵称
const nickName = computed(() => store.getters.nickName);

// banner
const bannerList = [
  {
    imgUrl: require("@/assets/banner-images/1.jpg"),
  },
  {
    imgUrl: require("@/assets/banner-images/2.jpg"),
  },
  {
    imgUrl: require("@/assets/banner-images/3.jpg"),
  },
];

// 表单
const form = reactive({
  username: "",
  password: "",
});

// 表单规则
const rules = reactive({
  username: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});

onMounted(() => {
  // 判断本地存储用户名是否存在
  if (getLocalS("username") && getLocalS("password")) {
    // 获取本地存储的用户名和密码
    form.username = getLocalS("username");
    form.password = AESDecrypt(getLocalS("password"));
    remeberPwd.value = true;
  }
});

// 登录
const onSubmit = () => {
  loginForm.value
    .validate()
    .then(async () => {
      const params = toRaw(form);
      try {
        submitLoading.value = true;
        const data = await store.dispatch("user/login", params);

        if (remeberPwd.value) {
          // 本地存储用户名和密码
          setLocalS("username", params.username);
          setLocalS("password", AESEncrypt(params.password));
        }

        data.roles = data.roles ? strToArr(data.roles, ",") : null;

        // 获取可通过的路由
        await store.dispatch("permission/generateRoutes", data.roles);

        // 更新用户信息
        store.commit("user/SET_USER", data);

        message.success(`尊敬的${data.nickName}，欢迎使用${systemTitle}`);
        submitLoading.value = false;

        router.push({ name: "UserCenter" });
      } catch (err) {
        if (err.message) {
          message.error(err.message);
        }
        submitLoading.value = false;
      }
    })
    .catch((err) => {
      console.log("error", err);
    });
};

const urlPrefix = process.env.VUE_APP_URL_PREFIX;

// 打开操作手册
const openOperationManual = () => {
  window.open(
    `${urlPrefix}/static/files/XLONG家里蹲信息化管理系统操作手册.pdf`,
    "_blank"
  );
};

// 退出登录
const logout = () => {
  Modal.confirm({
    title: "确认退出该系统吗？",
    icon: createVNode(ExclamationCircleOutlined),
    centered: true,
    async onOk() {
      try {
        await store.dispatch("user/logout");
        await store.dispatch("permission/generateRoutes", null);
        message.success("您已退出该系统");

        if (!remeberPwd.value) {
          form.username = "";
          form.password = "";

          // 清除校验
          loginForm.value.clearValidate();
        }
      } catch (err) {
        console.log(err);
      }
    },
    onCancel() {},
  });
};

// 忘记密码
const forgetPassword = () => {
  Modal.info({
    title: "测试账号",
    centered: true,
    content: h("div", {}, [
      h("p", "普通用户登录账号: 18888888888 密码: 666666"),
      h("p", "管理员登录账号: 17777075292 密码: 123456"),
      h("p", "超级管理员登录账号: 18376686974 密码: 123456"),
    ]),
    onOk() {
      console.log("ok");
    },
  });
};
</script>

<style lang="less" scoped>
.home {
  &-title {
    font-weight: normal;
    text-align: center;
    font-size: 42px;
    margin-bottom: 0;
    margin-top: 20px;
  }

  &-subtitle {
    // text-align: center;
    text-indent: 2em;
    font-size: 16px;
  }

  &-content {
    .banner-user {
      justify-content: space-between;
      overflow: hidden;
    }

    .banner {
      &__img {
        width: 100%;
        height: 355px;
      }
    }

    .login {
      &-container {
        width: 100%;
        background: #fff;
        height: 355px;
        border-radius: 4px;
        overflow: hidden;
        position: relative;
        margin-bottom: 20px;
      }

      &-title {
        text-align: center;
        padding: 10px 15px;
        background: @primary-color;
        color: #fff;
      }

      &-content {
        padding: 10px 20px;

        .welcome {
          text-indent: 2em;
          color: #7e8998;
          line-height: 1.5;
        }

        .from-label {
          padding: 10px 0;
          color: #2e363f;
        }
      }

      &-btn-container {
        position: absolute;
        text-align: center;
        width: 100%;
        bottom: 20px;
        left: 0;
      }
    }

    .password {
      &-container {
        justify-content: center;
        padding-top: 10px;
      }

      &-remember {
        margin-right: 20px;
      }

      &-forget {
        color: @primary-color;
        cursor: pointer;
        margin-top: -1px;

        &:hover {
          color: #09f;
        }
      }
    }

    .operation-guide {
      width: 900px;
      margin: auto;
      // ::v-deep(.ant-col) {
      //   justify-content: center;
      // }

      &__item {
        display: flex;
        justify-content: center;
      }
    }

    .guide-container,
    .browser-container {
      margin-bottom: 20px;

      h4 {
        font-size: 20px;
        font-weight: normal;
      }

      .iconfont {
        font-size: 22px;
        margin-right: 5px;
      }

      a {
        color: @primary-color;
        &:hover {
          color: #09f;
        }
      }
    }
  }
}

hr {
  height: 1px;
  margin: 10px 0;
  background-color: #e2e2e2;
  clear: both;
  border: 0;
  margin: 15px 0;
  border-top: #ddd 1px solid;
  border-bottom: #fff 1px solid;
}

@media (max-width: 950px) {
  .operation-guide__item {
    display: block !important;
  }
}
</style>
