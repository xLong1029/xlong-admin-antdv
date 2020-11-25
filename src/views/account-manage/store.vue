<template>
  <a-modal
    :title="title"
    :visible="visible"
    :confirm-loading="confirmLoading"
    centered
    class="account-store-container"
    width="800px"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-spin :spinning="infoLoading" tip="系统初始化，请稍后...">
      <a-form ref="submitForm" :model="form" :rules="rules" class="account-detail-container">
        <div class="account-detail-content">
          <div class="account-detail-content__title mt-0" id="baseInfo">基本信息</div>
          <div class="account-detail-content__cont">
            <div class="info-table">
              <div class="flex">
                <div style="width:100%">
                  <div class="info-table__tr">
                    <div class="info-table__th">
                      <span class="required">真实姓名</span>
                    </div>
                    <div class="info-table__td">
                      <a-form-item name="realname" class="width-100">
                        <a-input v-model:value="form.realname" placeholder="请输入内容"></a-input>
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
                            children: 'childs'
                          }"
                          placeholder="请选择所在省市"
                          @change="handleProvinceChange"
                        ></a-cascader>
                      </a-form-item>
                    </div>
                  </div>
                </div>
                <div class="info-table__tr">
                  <div class="info-table__td head-pic img-shade">
                    <img :src="form.face ? form.face : defaultFaceImg" @error="setdefaultFaceImg" />
                    <div class="img-shade-actions">
                      <!-- <a-upload
                        class="img-shade-actions-btn"
                        action="customize"
                        :accept="imgAccept"
                        :before-upload="imgBeforeUpload"
                        :http-request="uploadHead"
                        :show-file-list="false"
                      >
                        <i class="a-icon-edit"></i>编辑
                      </a-upload>-->
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
                    <a-date-picker v-model:value="form.birthdate" type="date" placeholder="请选择日期"></a-date-picker>
                  </a-form-item>
                </div>
                <div class="info-table__th">
                  <span class="required">性别</span>
                </div>
                <div class="info-table__td">
                  <a-form-item name="gender" class="width-100">
                    <a-radio-group v-model:valuel="form.gender">
                      <a-radio label="男">男</a-radio>
                      <a-radio label="女">女</a-radio>
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
                    <a-input v-model:value="form.mobile" placeholder="请输入手机号码"></a-input>
                  </a-form-item>
                </div>
                <div class="info-table__th">
                  <span class="required">电子邮箱</span>
                </div>
                <div class="info-table__td">
                  <a-form-item name="email" class="width-100">
                    <a-input v-model:value="form.email" placeholder="请输入电子邮箱"></a-input>
                  </a-form-item>
                </div>
              </div>
              <div class="info-table__tr">
                <div class="info-table__th">通讯地址</div>
                <div class="info-table__td">
                  <a-form-item class="width-100">
                    <a-input v-model:value="form.address" placeholder="请输入通讯地址"></a-input>
                  </a-form-item>
                </div>
              </div>
              <div class="info-table__tr">
                <div class="info-table__th">备注</div>
                <div class="info-table__td">
                  <a-form-item class="width-100">
                    <a-textarea v-model:value="form.remark" :rows="5" placeholder="请输入备注"></a-textarea>
                  </a-form-item>
                </div>
              </div>
            </div>
          </div>

          <div class="account-detail-content__title" id="workInfo">工作信息</div>
          <div class="account-detail-content__cont mb-0">
            <div class="info-table">
              <div class="info-table__tr">
                <div class="info-table__th">
                  <span class="required">工作单位名称</span>
                </div>
                <div class="info-table__td">
                  <a-form-item name="companyName" class="width-100">
                    <a-input v-model:value="form.companyName" placeholder="请输入工作单位名称"></a-input>
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
                      >{{ item.name }}</a-select-option>
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
                      @change="handleWorkTimeChange"
                      class="mr-10 work-time"
                    />
                    <a-checkbox v-model="form.isGraduate" @change="handleGraduateChange">尚未毕业</a-checkbox>
                  </a-form-item>
                </div>
              </div>
              <div class="info-table__tr">
                <div class="info-table__th">
                  <span class="required">专业领域</span>
                </div>
                <div class="info-table__td">
                  <a-form-item name="profession" class="width-100">
                    <a-checkbox-group v-model:value="form.profession" :options="professionList" />
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
// Json数据
import JsonCity from "mock/city.json";
import JsonData from "mock/data.json";

export default {
  name: "AccountStore",
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

    const { showDevMoadl } = common();

    // 标题
    const title = ref("账户详情");

    // 职位
    const jobList = JsonData.job;

    // 参加工作时间
    const workTimePH = ref("请选择日期");

    // 改变工作时间
    const handleWorkTimeChange = e => {};
    // 勾选尚未毕业
    const handleGraduateChange = e => {};

    // 所在省市
    const provinceList = JsonCity;

    // 选择省市
    const handleProvinceChange = e => {};

    // 专业领域

    // 所在省市
    const professionList = JsonData.profession.map(e => ({
      label: e.name,
      value: e.name
    }));
    console.log(professionList);

    // 默认头像
    const defaultFaceImg = require("@/assets/images/head.jpg");

    // 设置默认图片
    const setdefaultFaceImg = e => {
      e.currentTarget.src = defaultFaceImg.value;
      e.currentTarget.onerror = null;
    };

    // 默认表单
    const defaultForm = {
      realName: null,
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
      profession: []
    };

    // 表单
    const form = reactive({ ...defaultForm });

    // 表单规则
    const rules = reactive({
      realName: [
        { required: true, message: "请输入真实姓名", trigger: "blur" }
      ],
      province: [
        {
          type: "array",
          required: true,
          message: "请选择所在省市",
          trigger: "change"
        }
      ],
      birthdate: [{ required: true, message: "请选择日期", trigger: "change" }],
      gender: [{ required: true, message: "请选择性别", trigger: "change" }],
      mobile: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
      email: [{ required: true, message: "请输入电子邮箱", trigger: "blur" }],
      companyName: [
        { required: true, message: "请输入工作单位名称", trigger: "blur" }
      ],
      job: [
        {
          required: true,
          message: "请选择职位",
          trigger: "change"
        }
      ],
      workTime: [{ required: true, message: "请选择日期", trigger: "change" }],
      profession: [
        {
          type: "array",
          required: true,
          message: "请选择专业领域",
          trigger: "change"
        }
      ]
    });

    // 确认弹窗
    const handleOk = () => {
      if (props.type > 1) {
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
            ctx.$message.error("无法获取账户信息!");
          }
        })
        .catch(err => console.log(err))
        .finally(() => (infoLoading.value = false));
    };

    // 提交loading
    const confirmLoading = ref(false);

    // 监听可见性
    watch(
      () => props.visible,
      val => {
        if (val) {
          switch (props.type) {
            case 1:
              title.value = "新增账户";
              ctx.$nextTick(() => {
                // ctx.$refs.submitForm.resetFields(); // 无效
                resetForm();
              });
              break;
            case 2:
              title.value = "编辑账户";
              // getInfo(props.id);
              break;
            case 3:
              title.value = "查看详情";
              // getInfo(props.id);
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
      confirmLoading,
      handleOk,
      handleCancel,
      form,
      rules,
      professionList,
      provinceList,
      defaultFaceImg,
      setdefaultFaceImg,
      workTimePH,
      handleProvinceChange,
      jobList,
      handleWorkTimeChange,
      handleGraduateChange
    };
  }
};
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

  &-thumbnail {
    width: 100%;
    height: 100%;
    // cursor: pointer;
  }

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

    &-btn {
      cursor: pointer;
    }

    /deep/ .el-upload:focus {
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
