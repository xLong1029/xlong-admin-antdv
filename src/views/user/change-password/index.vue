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
          <a-button type="primary" @click="onSubmit" :loading="loading"
            >提交修改</a-button
          >
          <a-button @click="resetForm">重置</a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { getCurrentInstance, reactive, toRaw, ref, computed } from "vue";
import { validPassword, isEqual } from "utils/validate";
import Api from "api/user";

export default {
  name: "ChangePassword",
  setup() {
    const { ctx } = getCurrentInstance();

    const token = computed(() => ctx.$store.getters.token);

    const labelColSpan = 6;
    const wrapperColSpan = 18;

    const loading = ref(false);

    const form = reactive({
      oldPassword: "",
      newPassword: "",
      rePassword: ""
    });

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
      ctx.$refs.submitForm
        .validate()
        .then(async () => {
          const params = toRaw(form);

          if (params.oldPassword == params.newPassword) {
            ctx.$message.error("旧密码和新密码不能相同！");
            return false;
          }

          loading.value = true;

          // 修改密码 Api
          Api.ChangePwd(params, token.value)
            .then(async res => {
              const { code, msg } = res;
              if (code == 200) {
                // 登出 action方法
                try {
                  await ctx.$store.dispatch("user/logout");
                  await ctx.$store.dispatch("permission/generateRoutes", null);
                  ctx.$message.success("密码修改成功!请重新登录");
                  ctx.$router.push({ name: "Home" });
                } catch (err) {
                  console.log(err);
                  ctx.$router.push({ name: "Home" });
                }
              } else if (code == 404) ctx.$message.warning(msg);
              else ctx.$message.error("密码修改失败！");
            })
            .catch(err => ctx.$message.error(err.error))
            .finally(() => (loading.value = false));
        })
        .catch(err => {
          console.log("error", err);
        });
    };

    const resetForm = () => {
      ctx.$refs.submitForm.resetFields();
    };

    return {
      labelColSpan,
      wrapperColSpan,
      form,
      rules,
      loading,
      onSubmit,
      resetForm
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
