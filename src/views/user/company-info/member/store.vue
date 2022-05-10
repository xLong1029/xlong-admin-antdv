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
              <a-tag v-if="form.roles?.indexOf('admin') >= 0" color="blue">超级管理员</a-tag>
              <a-tag v-if="form.roles?.indexOf('manage') >= 0" color="green"
                >系统管理员</a-tag
              >
              <a-tag v-if="form.roles?.indexOf('user') >= 0" color="orange">普通用户</a-tag>
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
            <a-form-item label="角色" name="roles">
              <a-select
                v-model:value="form.roles"
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

<script setup>
import { watch, ref, reactive, onMounted, computed, nextTick } from "vue";
import { message } from "ant-design-vue";
// 通用模块
import useCommon from "common";
// Api
import Api from "api/company";

// eslint-disable-next-line
const props = defineProps({
  // 弹窗可见性
  visible: {
    type: Boolean,
    default: false,
  },
  // 详情id
  id: {
    type: String,
    default: null,
  },
  // 类型
  type: {
    type: Number,
    default: 1, // 1 新增, 2 编辑, 3 查看
  },
});

// eslint-disable-next-line
const emit = defineEmits(["change"]);

const { store, showDevModal } = useCommon();

// 监听可见性
watch(
  () => props.visible,
  async (val) => {
    if (val) {
      await nextTick();
      submitForm.value.resetFields();

      switch (props.type) {
        case 1:
          title.value = "新增人员";

          break;
        case 2:
          title.value = "编辑人员";
          getInfo(props.id);
          break;
        case 3:
          title.value = "查看详情";
          getInfo(props.id);
          break;
        default:
          console.log("type is error");
      }
    }
  }
);

// 当前用户角色
const roles = computed(() => store.getters.roles);

// 标题
const title = ref("人员信息详情");

// 默认表单
const defaultForm = {
  username: null,
  realName: null,
  gender: null,
  roles: null,
  nickName: null,
};

// 表单配置
const labelColSpan = 6;
const wrapperColSpan = 18;

// 表单
const form = reactive({ ...defaultForm });

// 表单规则
const rules = reactive({
  username: [{ required: true, message: "请输入账号", trigger: "blur" }],
  realName: [{ required: true, message: "请输入真实姓名", trigger: "blur" }],
  gender: [{ required: true, message: "请选择性别", trigger: "change" }],
  roles: [{ required: true, message: "请选择角色", trigger: "change" }],
  nickName: [{ required: true, message: "请输入昵称", trigger: "blur" }],
});

// loading
const infoLoading = ref(false);

const submitForm = ref(null);

// 确认弹窗
const handleOk = () => {
  if (props.type < 3) {
    showDevModal();
  }

  handleCancel();
};

// 取消弹窗
const handleCancel = () => {
  emit("close", false);
};

// 获取信息
const getInfo = () => {
  infoLoading.value = true;
  
  Api.GetMemberInfo(props.id)
    .then((res) => {
      const { code, data } = res;

      // 获取到数据
      if (code == 200) {
        for(let i in data){
          form[i] = data[i];
        }
      } else {
        message.error("无法获取人员信息!");
      }
    })
    .catch((err) => console.log(err))
    .finally(() => (infoLoading.value = false));
};

onMounted(() => {});
</script>
