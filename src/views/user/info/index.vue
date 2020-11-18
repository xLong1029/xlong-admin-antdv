<template>
  <div class="user-info-container">
    <a-spin :spinning="pageLoading" tip="加载中，请稍后...">
      <a-form
        ref="submitForm"
        :model="form"
        :rules="rules"
        :label-col="{ span: labelColSpan }"
        :wrapper-col="{ span: wrapperColSpan }"
      >
        <a-form-item label="账号" name="username">
          {{ form.username }}
        </a-form-item>
        <a-form-item label="用户昵称" name="nickName">
          <a-input
            v-model:value="form.nickName"
            placeholder="请输入昵称"
            @keyup.enter="onSubmit"
          />
        </a-form-item>
        <a-form-item label="真实姓名" name="realName">
          <a-input
            v-model:value="form.realName"
            placeholder="请输入真实姓名"
            @keyup.enter="onSubmit"
          />
        </a-form-item>
        <a-form-item label="性别" name="gender">
          <a-radio-group v-model:value="form.gender">
            <a-radio value="男">男</a-radio>
            <a-radio value="女">女</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          :wrapper-col="{ span: wrapperColSpan, offset: labelColSpan }"
        >
          <a-button @click="goBack" class="mr-10">返回</a-button>
          <a-button type="primary" @click="onSubmit" :loading="submitLoading"
            >提交修改</a-button
          >
        </a-form-item>
      </a-form>
    </a-spin>
  </div>
</template>

<script>
import { getCurrentInstance, reactive, toRaw, ref, computed } from "vue";
import Api from "api/user";
import common from "common";
import { strToArr } from "utils";

export default {
  name: "UserInfo",
  setup() {
    const { ctx } = getCurrentInstance();

    const { goBack } = common();

    const labelColSpan = 6;
    const wrapperColSpan = 18;

    const token = computed(() => ctx.$store.getters.token);

    const form = reactive({
      username: "",
      nickName: "",
      realName: "",
      gender: ""
    });

    const rules = reactive({
      nickName: [{ required: true, message: "请输入昵称", trigger: "blur" }],
      realName: [
        { required: true, message: "请输入真实姓名", trigger: "blur" }
      ],
      gender: [{ required: true, message: "请选择性别", trigger: "change" }]
    });

    const pageLoading = ref(false);

    const userId = ref(null);

    // 获取个人资料
    const getProfile = () => {
      pageLoading.value = true;
      Api.GetUser(token.value)
        .then(res => {
          const { code, data } = res;
          // 获取到数据
          if (code == 200) {
            const {
              username,
              nickName,
              realName,
              gender,
              objectId,
              userFace,
              role
            } = data;

            form.username = username;
            form.nickName = nickName;
            form.realName = realName;
            form.gender = gender;

            userId.value = objectId;

            // 更新用户信息
            ctx.$store.commit("user/SET_USER", {
              id: objectId,
              avatar: userFace ? userFace : null,
              gender,
              username,
              realName,
              nickName,
              roles: role ? strToArr(role, ",") : null
            });
          } else {
            ctx.$message.error("无法获取用户数据!");
            console.log("无该用户");
          }
        })
        .catch(err => console.log(err))
        .finally(() => (pageLoading.value = false));
    };

    const submitLoading = ref(false);

    // 提交修改
    const onSubmit = () => {
      ctx.$refs.submitForm
        .validate()
        .then(async () => {
          let params = toRaw(form);

          Api.EditProfile(params, userId.value)
            .then(res => {
              if (res.code == 200) {
                getProfile();
                ctx.$message.success("资料修改成功！");
              } else ctx.$message.error("资料修改失败！");
            })
            .catch(err => console.log(err));
        })
        .catch(err => {
          console.log("error", err);
        });
    };

    getProfile();

    return {
      labelColSpan,
      wrapperColSpan,
      form,
      rules,
      submitLoading,
      pageLoading,
      onSubmit,
      goBack
    };
  }
};
</script>
<style lang="less" scoped>
.user-info-container {
  padding: 40px 0;
  width: 500px;
  margin: auto;
}
</style>
