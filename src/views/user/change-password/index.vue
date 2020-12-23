<template>
  <div class="change-password-container">
    <a-form
      ref="submitForm"
      :model="form"
      :rules="rules"
      :label-col="{ span: labelColSpan }"
      :wrapper-col="{ span: wrapperColSpan }"
    >
      <a-form-item label="旧密码" name="oldPassword">
        <a-input-password
          v-model:value="form.oldPassword"
          placeholder="请输入旧密码"
          @keyup.enter="onSubmit"
        />
      </a-form-item>
      <a-form-item label="新密码" name="newPassword">
        <a-input-password
          v-model:value="form.newPassword"
          placeholder="请输入新密码"
          @keyup.enter="onSubmit"
        />
      </a-form-item>
      <a-form-item label="确认密码" name="rePassword">
        <a-input-password
          v-model:value="form.rePassword"
          placeholder="请输入确认密码"
          @keyup.enter="onSubmit"
        />
      </a-form-item>
      <a-form-item
        :wrapper-col="{ span: wrapperColSpan, offset: labelColSpan }"
      >
        <a-space size="small">
          <a-button type="primary" @click="onSubmit" :loading="submitLoading"
            >提交修改</a-button
          >
          <a-button @click="handleResetForm">重置</a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { reactive, toRaw, ref, computed } from "vue";
import { message } from "ant-design-vue";
// 通用模块
import common from "common";
// 校验
import { validPassword, isEqual } from "utils/validate";
// Api
import Api from "api/user";

export default {
  name: "ChangePassword",

  setup() {
    const { store, router } = common();

    // 用户token
    const token = computed(() => store.getters.token);

    // 表单配置
    const labelColSpan = 6;
    const wrapperColSpan = 18;

    // 提交loading
    const submitLoading = ref(false);
    const submitForm = ref(null);

    // 表单
    const form = reactive({
      oldPassword: "",
      newPassword: "",
      rePassword: ""
    });

    // 校验
    const validateNewPassword = (rule, value) => {
      if (!value) {
        return Promise.reject("请输入新密码");
      } else if (!validPassword(value)) {
        return Promise.reject("密码中必须包含字母、数字，长度至少为6个字符！");
      } else {
        return Promise.resolve();
      }
    };
    const validateComfirPassword = (rule, value) => {
      if (!value) {
        return Promise.reject("请输入确认密码");
      } else if (!isEqual(value, form.newPassword)) {
        return Promise.reject("两次输入密码不一致");
      } else {
        return Promise.resolve();
      }
    };

    // 表单规则
    const rules = reactive({
      oldPassword: [
        { required: true, message: "请输入旧密码", trigger: "blur" }
      ],
      newPassword: [
        {
          required: true,
          validator: validateNewPassword,
          trigger: "blur"
        }
      ],
      rePassword: [
        {
          required: true,
          validator: validateComfirPassword,
          trigger: "blur"
        }
      ]
    });

    // 登录
    const onSubmit = () => {
      submitForm.value
        .validate()
        .then(async () => {
          const params = toRaw(form);

          if (params.oldPassword == params.newPassword) {
            message.error("旧密码和新密码不能相同！");
            return false;
          }

          submitLoading.value = true;

          // 修改密码 Api
          Api.ChangePwd(params, token.value)
            .then(async res => {
              const { code, msg } = res;
              if (code == 200) {
                // 登出 action方法
                try {
                  await store.dispatch("user/logout");
                  await store.dispatch("permission/generateRoutes", null);
                  message.success("密码修改成功!请重新登录");
                  router.push({ name: "Home" });
                } catch (err) {
                  console.log(err);
                  router.push({ name: "Home" });
                }
              } else if (code == 404) message.warning(msg);
              else message.error("密码修改失败！");
            })
            .catch(err => message.error(err.error))
            .finally(() => (submitLoading.value = false));
        })
        .catch(err => {
          console.log("error", err);
        });
    };

    const handleResetForm = () => {
      submitForm.value.resetFields();
    };

    return {
      labelColSpan,
      wrapperColSpan,
      form,
      rules,
      submitLoading,
      onSubmit,
      handleResetForm,
      submitForm
    };
  }
};
</script>
<style lang="less" scoped>
.change-password-container {
  padding: 40px 0;
  width: 500px;
  margin: auto;
}
</style>
