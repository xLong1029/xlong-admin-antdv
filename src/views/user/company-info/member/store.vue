<template>
  <a-modal
    :title="title"
    :visible="visible"
    centered
    class="member-store-container"
    width="700px"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-spin :spinning="infoLoading" tip="系统初始化，请稍后...">
      <a-form
        ref="submitForm"
        :model="form"
        :rules="rules"
        :label-col="{ span: labelColSpan }"
        :wrapper-col="{ span: wrapperColSpan }"
      >
        <!-- 查看 -->
        <a-row v-if="type === 3" :gutter="10">
          <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <a-form-item label="账号">{{ form.username }}</a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <a-form-item label="角色">
              <a-tag v-if="form.role == 'admin'" color="blue">超级管理员</a-tag>
              <a-tag v-if="form.role == 'manage'" color="green"
                >系统管理员</a-tag
              >
              <a-tag v-if="form.role == 'user'" color="orange">普通用户</a-tag>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <a-form-item label="昵称">{{ form.nickName }}</a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <a-form-item label="真实姓名">{{ form.realName }}</a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <a-form-item label="性别">{{ form.gender }}</a-form-item>
          </a-col>
        </a-row>
        <!-- 存储 -->
        <a-row v-else :gutter="10">
          <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <a-form-item label="账号" name="username">
              <span v-if="type === 2">{{ form.username }}</span>
              <a-input
                v-else
                v-model:value="form.username"
                placeholder="请输入账号"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <a-form-item label="角色" name="role">
              <a-select
                v-model:value="form.role"
                class="width-100"
                placeholder="请选择角色"
              >
                <a-select-option
                  v-if="roles.indexOf('admin') >= 0"
                  value="admin"
                  >超级管理员</a-select-option
                >
                <a-select-option value="manage">系统管理员</a-select-option>
                <a-select-option value="user">普通用户</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <a-form-item label="昵称" name="nickName">
              <a-input v-model:value="form.nickName" placeholder="请输入昵称" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <a-form-item label="真实姓名" name="realName">
              <a-input
                v-model:value="form.realName"
                placeholder="请输入真实姓名"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <a-form-item label="性别" name="gender">
              <a-radio-group v-model:value="form.gender">
                <a-radio value="男">男</a-radio>
                <a-radio value="女">女</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import {
  getCurrentInstance,
  watch,
  ref,
  reactive,
  onMounted,
  computed
} from "vue";
import common from "common";
import Api from "api/company";

export default {
  name: "MemberStore",
  props: {
    // 弹窗可见性
    visible: {
      type: Boolean,
      default: false
    },
    // 详情id
    id: {
      type: String,
      default: null
    },
    // 类型
    type: {
      type: Number,
      default: 1 // 1 新增, 2 编辑, 3 查看
    }
  },
  setup(props, context) {
    const { ctx } = getCurrentInstance();

    // 当前用户角色
    const roles = computed(() => ctx.$store.getters.roles);

    const { showDevMoadl } = common();

    // 标题
    const title = ref("人员信息详情");

    // 默认表单
    const defaultForm = {
      username: null,
      realName: null,
      gender: null,
      role: null,
      nickName: null
    };

    // 表单配置
    const labelColSpan = 6;
    const wrapperColSpan = 18;

    // 表单
    const form = reactive({ ...defaultForm });

    // 表单规则
    const rules = reactive({
      username: [{ required: true, message: "请输入账号", trigger: "blur" }],
      realName: [
        { required: true, message: "请输入真实姓名", trigger: "blur" }
      ],
      gender: [{ required: true, message: "请选择性别", trigger: "change" }],
      role: [{ required: true, message: "请选择角色", trigger: "change" }],
      nickName: [{ required: true, message: "请输入昵称", trigger: "blur" }]
    });

    // 角色列表
    const roleList = [
      {
        label: "超级管理员",
        value: "admin"
      },
      {
        label: "系统管理员",
        value: "manage"
      },
      {
        label: "普通用户",
        value: "user"
      }
    ];

    // 确认弹窗
    const handleOk = () => {
      if (props.type < 3) {
        showDevMoadl();
      }

      handleCancel();
    };

    // 取消弹窗
    const handleCancel = () => {
      context.emit("close", false);
      context.emit("update:visible", false);
      resetForm();
    };

    // 重置表单
    const resetForm = () => {
      const { username, realName, gender, role, nickName } = defaultForm;
      form.username = username;
      form.realName = realName;
      form.gender = gender;
      form.role = role;
      form.nickName = nickName;
    };

    // loading
    const infoLoading = ref(false);

    // 获取信息
    const getInfo = () => {
      infoLoading.value = true;
      Api.GetMemberInfo(props.id)
        .then(res => {
          const { code, data } = res;
          // 获取到数据
          if (code == 200) {
            const { username, realName, gender, role, nickName } = data;
            form.username = username;
            form.realName = realName;
            form.gender = gender;
            form.role = role;
            form.nickName = nickName;
          } else {
            ctx.$message.error("无法获取人员信息!");
          }
        })
        .catch(err => console.log(err))
        .finally(() => (infoLoading.value = false));
    };

    // 监听可见性
    watch(
      () => props.visible,
      val => {
        if (val) {
          switch (props.type) {
            case 1:
              title.value = "新增人员";
              ctx.$nextTick(() => {
                // ctx.$refs.submitForm.resetFields(); // 无效
                resetForm();
              });
              break;
            case 2:
              title.value = "编辑人员";
              getInfo(props.id);
              break;
            case 3:
              title.value = "查看详情";
              getInfo(props.id);
              break;
          }
        }
      }
    );

    onMounted(() => {});

    return {
      title,
      infoLoading,
      showDevMoadl,
      handleOk,
      handleCancel,
      form,
      rules,
      roleList,
      labelColSpan,
      wrapperColSpan,
      roles
    };
  }
};
</script>
