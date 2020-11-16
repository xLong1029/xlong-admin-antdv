<template>
  <div class="home-container">
    <h1 class="home-title">
      <strong class="mr-10">欢迎使用</strong>
      {{ systemTitle }}
    </h1>
    <p class="home-subtitle mt-20">
      为了实现对XXX牛逼的服务质量，我们在此为广大群众提供在线服务，欢迎大家使用，并对我们的服务提出宝贵的意见（没错，是编的，不用太认真）。
    </p>
    <div class="home-content mt-40">
      <div class="banner-user">
        <a-row :gutter="10">
          <a-col :xs="24" :sm="24" :md="16" :lg="18" :xl="18">
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
          <a-col :xs="24" :sm="24" :md="8" :lg="6" :xl="6">
            <!-- 登录部分 -->
            <div class="login-container">
              <div class="login-title">
                {{ realName ? "欢迎您" : "用户登录" }}
              </div>
              <template v-if="realName">
                <div class="login-content">
                  <p>尊敬的{{ realName }}：</p>
                  <p class="welcome">您已登录{{ systemTitle }}，欢迎使用。</p>
                </div>
                <div class="login-btn-container">
                  <a-button type="primary" @click="showDevMoadl()" class="mr-10"
                    >修改密码</a-button
                  >
                  <a-button @click="showDevMoadl()">退出登录</a-button>
                </div>
              </template>
              <template v-else>
                <div class="login-content mt-10">
                  <a-form :label-col="{ span: 24 }" :wrapper-col="{ span: 24 }">
                    <a-form-item
                      label="手机号码"
                      v-bind="validateInfos.username"
                    >
                      <a-input
                        v-model:value="modelRef.username"
                        placeholder="请输入手机号码"
                        @keyup.enter="onSubmit"
                      />
                    </a-form-item>
                    <a-form-item label="密码" v-bind="validateInfos.password">
                      <a-input-password
                        v-model:value="modelRef.password"
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
                    <span class="password-forget" @click="showDevMoadl()"
                      >忘记密码？</span
                    >
                  </div>
                  <div class="login-btn-container">
                    <a-button
                      type="primary"
                      @click="onSubmit"
                      :loading="loading"
                      class="mr-10"
                      >登录</a-button
                    >
                    <a-button @click="showDevMoadl()">注册</a-button>
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
          <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex">
            <div class="guide-container">
              <h4><i class="iconfont icon-book"></i>操作手册下载地址</h4>
              <div>
                <a target="_blank" type="primary" @click="openOperationManual()"
                  >{{ systemTitle }}操作手册</a
                >
              </div>
            </div>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex">
            <div class="browser-container">
              <h4><i class="iconfont icon-liulanqi"></i>网页推荐使用浏览器</h4>
              <div>
                <a
                  href="https://www.google.cn/intl/zh-CN/chrome/?standalone=1"
                  target="_blank"
                  >下载谷歌浏览器</a
                >
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
      <hr />
    </div>
  </div>
</template>

<script>
import { computed, getCurrentInstance, reactive, toRaw, ref, watch } from "vue";
import { useForm } from "@ant-design-vue/use";
import common from "common/index.js";
import {
  setLocalS,
  getLocalS,
  delLocalS,
  encrypt,
  decrypt,
  strToArr
} from "utils";

export default {
  name: "Home",
  setup() {
    const { showDevMoadl } = common();

    const systemTitle = process.env.VUE_APP_SYSYTEM_TITLE;

    const { ctx } = getCurrentInstance();

    const realName = computed(() => ctx.$store.getters.realName);

    const bannerList = [
      {
        imgUrl: require("@/assets/banner-images/1.jpg")
      },
      {
        imgUrl: require("@/assets/banner-images/2.jpg")
      },
      {
        imgUrl: require("@/assets/banner-images/3.jpg")
      }
    ];

    const loading = ref(false);

    const modelRef = reactive({
      username: "",
      password: ""
    });

    const rulesRef = reactive({
      username: [
        { required: true, message: "请输入手机号码", trigger: "blur" }
      ],
      password: [{ required: true, message: "请输入密码", trigger: "blur" }]
    });

    const { validate, validateInfos } = useForm(modelRef, rulesRef);

    const remeberPwd = ref(false);
    // 判断本地存储用户名是否存在
    if (getLocalS("username")) {
      // 获取本地存储的用户名和密码
      modelRef.username = getLocalS("username");
      modelRef.password = decrypt(getLocalS("password"));
      remeberPwd.value = true;
    }

    watch(
      () => remeberPwd.value,
      val => {
        if (!val && getLocalS("username")) {
          delLocalS("username");
          delLocalS("password");
        }
      }
    );

    const onSubmit = e => {
      e.preventDefault();
      validate()
        .then(async () => {
          const params = toRaw(modelRef);
          try {
            loading.value = true;
            const userInfo = await ctx.$store.dispatch("user/login", params);
            if (remeberPwd.value) {
              // 本地存储用户名和密码
              setLocalS("username", params.username);
              setLocalS("password", encrypt(params.password));
            }

            const {
              realName,
              username,
              nickName,
              gender,
              objectId,
              userFace,
              role
            } = userInfo;

            const info = {
              avatar: userFace ? userFace : null,
              roles: role ? strToArr(role, ",") : null,
              realName,
              username,
              nickName,
              gender,
              id: objectId
            };

            // 更新用户信息
            ctx.$store.commit("user/SET_USER", info);

            ctx.$message.success(
              `尊敬的${userInfo.realName}，欢迎使用${systemTitle}`
            );
            loading.value = false;
          } catch (err) {
            ctx.$message.error(err.error ? err.error : err);
            loading.value = false;
          }
        })
        .catch(err => {
          console.log("error", err);
        });
    };

    const openOperationManual = () => {
      showDevMoadl();
    };

    return {
      realName,
      systemTitle,
      bannerList,
      showDevMoadl,
      openOperationManual,
      modelRef,
      rulesRef,
      remeberPwd,
      loading,
      onSubmit,
      validateInfos
    };
  }
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
    text-align: center;
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
      ::v-deep(.ant-col) {
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
</style>
