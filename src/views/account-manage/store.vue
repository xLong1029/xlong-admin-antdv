<template>
  <a-modal
    :title="title"
    :visible="visible"
    :confirm-loading="submitLoading"
    centered
    class="account-store-container"
    width="850px"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-spin :spinning="infoLoading" tip="系统初始化，请稍后...">
      <a-form
        ref="submitForm"
        :model="form"
        :rules="rules"
        class="account-detail-container"
      >
        <div ref="accountContent" class="account-detail-content">
          <div class="account-detail-content__title mt-0" id="baseInfo">
            基本信息
          </div>
          <div class="account-detail-content__cont">
            <div class="info-table">
              <div class="flex">
                <div style="width: 100%">
                  <div class="info-table__tr">
                    <div class="info-table__th">
                      <span class="required">真实姓名</span>
                    </div>
                    <div class="info-table__td">
                      <a-form-item name="realname" class="width-100">
                        <a-input
                          v-model:value="form.realname"
                          placeholder="请输入真实姓名"
                        ></a-input>
                      </a-form-item>
                    </div>
                  </div>
                  <div class="info-table__tr">
                    <div class="info-table__th">
                      <span class="required">所在省市</span>
                    </div>
                    <div class="info-table__td">
                      <a-form-item name="province" class="width-100">
                        <a-cascader
                          v-model:value="form.province"
                          :options="provinceList"
                          :field-names="{
                            label: 'name',
                            value: 'name',
                            children: 'childs',
                          }"
                          placeholder="请选择所在省市"
                        ></a-cascader>
                      </a-form-item>
                    </div>
                  </div>
                </div>
                <div class="info-table__tr">
                  <div class="info-table__td head-pic img-shade">
                    <img :src="form.avatar" @error="setDefaultHeadImg" />
                    <div class="img-shade-actions">
                      <a-upload
                        class="img-shade-actions__btn"
                        action="customize"
                        :accept="fileAccept"
                        :before-upload="handleBeforeUpload"
                        :custom-request="uploadAvatar"
                        @change="handleUploadChange"
                        :show-file-list="false"
                      >
                        <div v-if="uploadLoading">
                          <loading-outlined v-if="uploadLoading" />
                        </div>
                        <div v-else><edit-outlined />编辑</div>
                      </a-upload>
                    </div>
                  </div>
                </div>
              </div>
              <div class="info-table__tr">
                <div class="info-table__th">
                  <span class="required">出生日期</span>
                </div>
                <div class="info-table__td">
                  <a-form-item name="birthdate" class="width-100">
                    <a-date-picker
                      v-model:value="form.birthdate"
                      type="date"
                      placeholder="请选择日期"
                    ></a-date-picker>
                  </a-form-item>
                </div>
                <div class="info-table__th">
                  <span class="required">性别</span>
                </div>
                <div class="info-table__td">
                  <a-form-item name="gender">
                    <a-radio-group v-model:value="form.gender">
                      <a-radio value="男">男</a-radio>
                      <a-radio value="女">女</a-radio>
                    </a-radio-group>
                  </a-form-item>
                </div>
              </div>
              <div class="info-table__tr">
                <div class="info-table__th">
                  <span class="required">手机号码</span>
                </div>
                <div class="info-table__td">
                  <a-form-item name="mobile" class="width-100">
                    <a-input
                      v-model:value="form.mobile"
                      placeholder="请输入手机号码"
                    ></a-input>
                  </a-form-item>
                </div>
                <div class="info-table__th">
                  <span class="required">电子邮箱</span>
                </div>
                <div class="info-table__td">
                  <a-form-item name="email" class="width-100">
                    <a-input-group compact>
                      <a-input
                        style="width: 40%"
                        v-model:value="form.email"
                        placeholder="请输入电子邮箱"
                      ></a-input>
                      <a-select
                        style="width: 60%"
                        v-model:value="emailSuffixValue"
                      >
                        <a-select-option
                          v-for="(item, index) in emailSuffixList"
                          :key="'emailSuffix' + index"
                          :value="item.value"
                          >{{ item.name }}</a-select-option
                        >
                      </a-select>
                    </a-input-group>
                  </a-form-item>
                </div>
              </div>
              <div class="info-table__tr">
                <div class="info-table__th">通讯地址</div>
                <div class="info-table__td">
                  <a-form-item name="address" class="width-100">
                    <a-input
                      v-model:value="form.address"
                      placeholder="请输入通讯地址"
                    ></a-input>
                  </a-form-item>
                </div>
              </div>
              <div class="info-table__tr">
                <div class="info-table__th">备注</div>
                <div class="info-table__td">
                  <a-form-item name="remark" class="width-100">
                    <a-textarea
                      v-model:value="form.remark"
                      :rows="5"
                      placeholder="请输入备注"
                    ></a-textarea>
                  </a-form-item>
                </div>
              </div>
            </div>
          </div>

          <div class="account-detail-content__title" id="workInfo">
            工作信息
          </div>
          <div class="account-detail-content__cont mb-0">
            <div class="info-table">
              <div class="info-table__tr">
                <div class="info-table__th">
                  <span class="required">工作单位名称</span>
                </div>
                <div class="info-table__td">
                  <a-form-item name="companyName" class="width-100">
                    <a-input
                      v-model:value="form.companyName"
                      placeholder="请输入工作单位名称"
                    ></a-input>
                  </a-form-item>
                </div>
                <div class="info-table__th">
                  <span class="required">职位</span>
                </div>
                <div class="info-table__td">
                  <a-form-item name="job" class="width-100">
                    <a-select v-model:value="form.job" placeholder="请选择职位">
                      <a-select-option
                        v-for="(item, index) in jobList"
                        :key="'job' + index"
                        :value="item.name"
                        >{{ item.name }}</a-select-option
                      >
                    </a-select>
                  </a-form-item>
                </div>
              </div>
              <div class="info-table__tr">
                <div class="info-table__th">
                  <span class="required">参加工作时间</span>
                </div>
                <div class="info-table__td">
                  <a-form-item name="workTime" class="width-100">
                    <a-date-picker
                      v-model:value="form.workTime"
                      :placeholder="workTimePH"
                      :disabled="form.isGraduate"
                      class="mr-10 work-time"
                    />
                    <a-checkbox
                      v-model:checked="form.isGraduate"
                      @change="handleGraduateChange"
                      >尚未毕业</a-checkbox
                    >
                  </a-form-item>
                </div>
              </div>
              <div class="info-table__tr">
                <div class="info-table__th">
                  <span class="required">专业领域</span>
                </div>
                <div class="info-table__td">
                  <a-form-item name="profession" class="width-100">
                    <a-checkbox-group
                      v-model:value="form.profession"
                      :options="professionList"
                    />
                  </a-form-item>
                </div>
              </div>
              <div class="info-table__tr"></div>
            </div>
          </div>
        </div>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script setup>
import { watch, ref, reactive, toRaw, nextTick, onMounted } from "vue";
import { message } from "ant-design-vue";
import moment from "moment";
// 通用模块
import useUpload from "common/upload.js";
// 工具
import { compareDate } from "utils";
import { docElmScrollTo } from "utils/scroll-to.js";
import { validEmail, validMobile } from "utils/validate";
// Api
import Api from "api/account-manage";
import PublicApi from "api/public";

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
const emit = defineEmits(["close", "submit"]);

// 默认头像
const defaultFaceImg = require("@/assets/images/head.jpg");

// 监听可见性
watch(
  () => props.visible,
  async (val) => {
    if (val) {
      await nextTick();
      emailSuffixValue.value = "@qq.com";
      submitForm.value.resetFields();
      submitForm.value.clearValidate();
      form.avatar = defaultFaceImg;
      const doc = document.getElementsByClassName("ant-modal-body")[0];
      docElmScrollTo(doc, 0);

      switch (props.type) {
        case 1:
          title.value = "新增账户";
          break;
        case 2:
          title.value = "编辑账户";
          getInfo(props.id);
          break;
        default:
          console.log("type is error");
      }
    }
  }
);

// 标题
const title = ref("账户详情");

// 职位
const jobList = ref([]);

// 参加工作时间
const workTimePH = ref("请选择日期");

// 勾选尚未毕业
const handleGraduateChange = (e) => {
  const value = e.target.checked;
  if (value) {
    form.workTime = "";
    workTimePH.value = "尚未毕业";
  } else {
    workTimePH.value = "请选择日期";
  }
};

// 所在省市
const provinceList = ref([]);

// 专业领域
const professionList = ref([]);

// 邮箱后缀
const emailSuffixList = ref([]);
const emailSuffixValue = ref(null);

const { fileAccept, beforeUpload, uploadFileDemo } = useUpload();

// 设置默认头像
const setDefaultHeadImg = (e) => {
  e.currentTarget.src = defaultFaceImg;
  e.currentTarget.onerror = null;
};

// 头像上传前
const handleBeforeUpload = (file) => {
  return beforeUpload(file, function (file) {
    // 双重检查，避免在“所有文件”中选择其他文件
    if (
      !(
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/gif"
      )
    ) {
      message.warning("图片只能是 png 、jpg 、gif 格式");
      return false;
    }
    return true;
  });
};

const uploadLoading = ref(false);

// 上传状态改变
const handleUploadChange = (info) => {
  if (info.file.status === "uploading") {
    uploadLoading.value = true;
    return;
  }
  if (info.file.status === "done") {
    uploadLoading.value = false;
  }
  if (info.file.status === "error") {
    uploadLoading.value = false;
  }
};

// 上传头像
const uploadAvatar = (params) => {
  // console.log("uploadFile", params);
  const file = params.file;

  uploadFileDemo(file)
    .then((res) => {
      form.avatar = res.data.url;
    })
    .catch((err) => console.log(err))
    .finally(() => (uploadLoading.value = false));
};

// 默认表单
const defaultForm = {
  avatar: defaultFaceImg,
  realname: null,
  province: [],
  birthdate: null,
  gender: null,
  mobile: null,
  email: null,
  address: null,
  companyName: null,
  job: null,
  workTime: null,
  isGraduate: null,
  profession: [],
};

// 表单
const form = reactive({ ...defaultForm });

// 校验
const validBirthDate = (rule, value) => {
  if (!value) {
    return Promise.reject("请选择出生日期");
  }
  let nowDate = new Date();
  const compare = compareDate(value, nowDate);
  if (!compare) return Promise.reject("出生日期不能大于当前日期");
  else {
    return Promise.resolve();
  }
};
const validateMobile = (rule, value) => {
  if (!value) {
    return Promise.reject(new Error("请输入手机号码"));
  } else if (!validMobile(value)) {
    return Promise.reject(new Error("手机号码格式不正确"));
  } else {
    return Promise.resolve();
  }
};
const validateEmail = (rule, value) => {
  if (!value) {
    return Promise.reject(new Error("请输入邮箱地址"));
  } else if (!validEmail(value + emailSuffixValue.value)) {
    return Promise.reject(new Error("邮箱格式不正确"));
  } else {
    return Promise.resolve();
  }
};
const validateWorkTime = (rule, value) => {
  if (form.isGraduate) return Promise.resolve();
  if (!value) return Promise.reject(new Error("请选择工作时间"));
  else {
    // 日期比较
    let nowDate = new Date();
    const compare = compareDate(value, nowDate);
    if (!compare) return Promise.reject(new Error("工作时间不能大于当前日期"));
    else return Promise.resolve();
  }
};

// 表单规则
const rules = reactive({
  realname: [{ required: true, message: "请输入真实姓名", trigger: "blur" }],
  province: [
    {
      type: "array",
      required: true,
      message: "请选择所在省市",
      trigger: "change",
    },
  ],
  birthdate: [
    {
      type: "object",
      required: true,
      validator: validBirthDate,
      trigger: "change",
    },
  ],
  gender: [{ required: true, message: "请选择性别", trigger: "change" }],
  mobile: [{ required: true, validator: validateMobile, trigger: "blur" }],
  email: [{ required: true, validator: validateEmail, trigger: "blur" }],
  companyName: [
    { required: true, message: "请输入工作单位名称", trigger: "blur" },
  ],
  job: [
    {
      required: true,
      message: "请选择职位",
      trigger: "change",
    },
  ],
  workTime: [
    {
      type: "object",
      required: true,
      validator: validateWorkTime,
      trigger: "change",
    },
  ],
  profession: [
    {
      type: "array",
      required: true,
      message: "请选择专业领域",
      trigger: "change",
    },
  ],
});

// 提交loading
const submitLoading = ref(false);

const submitForm = ref(null);

// 确认弹窗
const handleOk = () => {
  submitForm.value
    .validate()
    .then(async () => {
      const data = toRaw(form);

      submitLoading.value = true;

      let params = { ...data };
      params.email = data.email ? data.email + emailSuffixValue.value : "";
      params.province = data.province[0];
      params.city = data.province[1] ? data.province[1] : "";
      params.area = data.province[2] ? data.province[2] : "";
      params.birthdate = data.birthdate.format("YYYY-MM-DD");
      params.workTime = data.isGraduate
        ? null
        : data.workTime.format("YYYY-MM-DD");
      params.isGraduate = Boolean(data.isGraduate);

      console.log(params);

      // 新增
      if (props.type === 1) {
        Api.AddAccount(params)
          .then((res) => {
            if (res.code == 200) {
              message.success("添加成功");
              emit("submit", 1);
              handleCancel();
            } else message.error(res.msg);
          })
          .catch(() => message.error("操作失败"))
          .finally(() => (submitLoading.value = false));
      }
      // 编辑
      else {
        Api.EditAccount(params)
          .then((res) => {
            if (res.code == 200) {
              message.success("编辑成功");
              emit("submit", 2);
              handleCancel();
            } else message.error(res.msg);
          })
          .catch(() => message.error("操作失败"))
          .finally(() => (submitLoading.value = false));
      }
    })
    .catch((err) => {
      console.log("error", err);
      message.warning("请检查是否填写正确");
    });
};

// 取消弹窗
const handleCancel = () => {
  emit("close", false);
};

// loading
const infoLoading = ref(false);

onMounted(async () => {
  try {
    const jobRes = await PublicApi.GetJobList();
    if (jobRes.code === 200) {
      jobList.value = jobRes.data;
    }

    const cityRes = await PublicApi.GetCityList();
    if (cityRes.code === 200) {
      provinceList.value = cityRes.data;
    }

    const professionRes = await PublicApi.GetProfessionList();
    if (professionRes.code === 200) {
      professionList.value = professionRes.data.map((e) => ({
        label: e.name,
        value: e.name,
      }));
    }

    const emailSuffixRes = await PublicApi.GetEmailSuffix();
    if (emailSuffixRes.code === 200) {
      emailSuffixList.value = emailSuffixRes.data;
      emailSuffixValue.value = emailSuffixRes.data[0].value;
    }
  } catch (err) {
    message.warning(err);
  }
});

// 获取信息
const getInfo = () => {
  infoLoading.value = true;

  Api.GetAccInfo(props.id)
    .then((res) => {
      const { code, data, message: msg } = res;
      // 获取到数据
      if (code == 200) {
        for (let i in data) {
          form[i] = data[i];
        }

        form.avatar = data.avatar || defaultFaceImg;
        form.province = [data.province, data.city, data.area];
        form.birthdate = data.birthdate
          ? moment(data.birthdate, "YYYY-MM-DD")
          : null;

        const emailSplit = data.email.split("@");
        form.email = emailSplit[0];
        emailSuffixValue.value = `@${emailSplit[1]}`;

        form.workTime = data.isGraduate ? null : data.workTime ? moment(data.workTime, "YYYY-MM-DD") : null;

        workTimePH.value = data.isGraduate ? "尚未毕业" : "请选择日期";
      } else message.error(msg);
    })
    .catch((err) => console.log(err))
    .finally(() => (infoLoading.value = false));
};

// 提交loading
const confirmLoading = ref(false);
</script>

<style lang="less" scoped>
.account-detail {
  &-content {
    &__title {
      font-size: 16px;
      margin-bottom: 10px;
      font-weight: bold;
      color: @primary-color;
    }

    &__cont {
      margin-bottom: 20px;
    }
  }
}

@border: 1px solid #ebeef5;
.info-table {
  width: 100%;
  border-top: @border;
  border-left: @border;

  &-container {
    height: 100%;
    min-height: 400px;
  }

  &__tr {
    display: flex;
  }

  &__th,
  &__td {
    padding: 12px 10px;
    border-bottom: @border;
    border-right: @border;
  }

  &__td {
    padding-bottom: 0;
  }

  &__th {
    display: flex;
    align-items: center;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: #fafafa;
    width: 135px;
    min-width: 135px;
    max-width: 135px;
  }

  &__td {
    width: 100%;
  }

  &__icon {
    font-size: 20px;
  }
}

.color-green {
  color: @green;
}

.color-red {
  color: @red;
}

.head-pic {
  text-align: center;
  display: flex;
  align-items: center;
  height: 100%;

  &:hover {
    .img-shade-actions {
      opacity: 1;
    }
  }

  img {
    min-width: 100px;
    max-width: 100px;
    max-height: 138px;
  }
}

.align-item-center {
  display: flex;
  align-items: center;
}

.img-shade {
  position: relative;
  width: 100%;
  height: 100%;

  &-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    cursor: default;
    color: #fff;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s;

    &__btn {
      cursor: pointer;

      // 隐藏默认上传loading效果
      ::v-deep(.ant-upload-list) {
        display: none;
      }
    }

    ::v-deep(.ant-upload) {
      color: #fff;
    }
  }
}

.required::before {
  content: "*";
  color: @pink;
  margin-right: 5px;
}

.width-100 {
  ::v-deep(.ant-form-item-control-wrapper) {
    max-width: auto;
    width: 100%;
  }

  ::v-deep(.ant-calendar-picker) {
    width: 100%;
  }
}

.work-time {
  width: 82% !important;
}
</style>
