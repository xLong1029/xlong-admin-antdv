<template>
  <a-modal
    :title="title"
    :visible="visible"
    :confirm-loading="confirmLoading"
    centered
    class="account-store-container"
    width="900px"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-spin :spinning="infoLoading" tip="系统初始化，请稍后...">
      <a-form
        ref="submitForm"
        :model="form"
        :rules="rules"
        :laba-col="{ span: labelColSpan }"
        :wrapper-col="{ span: wrapperColSpan }"
        class="account-detail-container"
      >
        <!-- <a-row :gutter="10">
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
        </a-row>-->
        <div>
          <div
            ref="detailContent"
            class="account-detail-content"
            @scroll="contentScorll"
          >
            <a-form ref="form" :model="form" :rules="validate">
              <div class="account-detail-content__title" id="baseInfo">
                基本信息
              </div>
              <div class="account-detail-content__cont">
                <div class="info-table">
                  <div class="flex">
                    <div style="width:100%">
                      <div class="info-table__tr">
                        <div class="info-table__th">
                          <span class="required">真实姓名</span>
                        </div>
                        <div class="info-table__td">
                          <a-form-item prop="realname">
                            <a-input
                              v-model="form.realname"
                              placeholder="请输入内容"
                            ></a-input>
                          </a-form-item>
                        </div>
                      </div>
                      <div class="info-table__tr">
                        <div class="info-table__th">
                          <span class="required">所在省市</span>
                        </div>
                        <div class="info-table__td">
                          <a-form-item prop="province">
                            <a-cascader
                              v-model="provinceValue"
                              :options="provinceList"
                              :props="provinceListProps"
                              placeholder="请选择所在省市"
                              style="width: 100%"
                              @change="provinceValueChange"
                            ></a-cascader>
                          </a-form-item>
                        </div>
                      </div>
                    </div>
                    <div class="info-table__tr">
                      <div class="info-table__td head-pic img-shade">
                        <img
                          :src="form.face ? form.face : defaultFaceImg"
                          @error="setdefaultFaceImg"
                        />
                        <div class="img-shade-actions">
                          <a-upload
                            class="img-shade-actions-btn"
                            action="customize"
                            :accept="imgAccept"
                            :before-upload="imgBeforeUpload"
                            :http-request="uploadHead"
                            :show-file-list="false"
                          >
                            <i class="a-icon-edit"></i>编辑
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
                      <a-form-item prop="birthdate">
                        <a-date-picker
                          v-model="form.birthdate"
                          type="date"
                          placeholder="请选择日期"
                          style="width:100%"
                        ></a-date-picker>
                      </a-form-item>
                    </div>
                    <div class="info-table__th">
                      <span class="required">性别</span>
                    </div>
                    <div class="info-table__td">
                      <a-form-item prop="gender">
                        <a-radio-group v-model="form.gender">
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
                      <a-form-item prop="mobile">
                        <a-input
                          v-model="form.mobile"
                          placeholder="请输入内容"
                        ></a-input>
                      </a-form-item>
                    </div>
                    <div class="info-table__th">
                      <span class="required">电子邮箱</span>
                    </div>
                    <div class="info-table__td">
                      <a-form-item prop="email">
                        <a-input
                          v-model="form.email"
                          placeholder="请输入内容"
                        ></a-input>
                      </a-form-item>
                    </div>
                  </div>
                  <div class="info-table__tr">
                    <div class="info-table__th">通讯地址</div>
                    <div class="info-table__td">
                      <a-form-item>
                        <a-input
                          v-model="form.address"
                          placeholder="请输入内容"
                        ></a-input>
                      </a-form-item>
                    </div>
                  </div>
                  <div class="info-table__tr">
                    <div class="info-table__th">备注</div>
                    <div class="info-table__td">
                      <a-form-item>
                        <a-input
                          v-model="form.remark"
                          type="textarea"
                          :autosize="{ minRows: 5 }"
                          placeholder="请输入内容"
                        ></a-input>
                      </a-form-item>
                    </div>
                  </div>
                </div>
              </div>

              <div class="account-detail-content__title" id="workInfo">
                工作信息
              </div>
              <div class="account-detail-content__cont">
                <div class="info-table">
                  <div class="info-table__tr">
                    <div class="info-table__th">
                      <span class="required">工作单位名称</span>
                    </div>
                    <div class="info-table__td">
                      <a-form-item prop="companyName">
                        <a-input
                          v-model="form.companyName"
                          placeholder="请输入内容"
                        ></a-input>
                      </a-form-item>
                    </div>
                    <div class="info-table__th">
                      <span class="required">职位</span>
                    </div>
                    <div class="info-table__td">
                      <a-form-item prop="job">
                        <a-select v-model="form.job" placeholder="请选择职位">
                          <a-select-option
                            v-for="(item, index) in jobList"
                            :key="'job' + index"
                            :label="item.name"
                            :value="item.name"
                          ></a-select-option>
                        </a-select>
                      </a-form-item>
                    </div>
                  </div>
                  <div class="info-table__tr">
                    <div class="info-table__th">
                      <span class="required">参加工作时间</span>
                    </div>
                    <div class="info-table__td">
                      <a-form-item prop="workTime">
                        <a-date-picker
                          v-model="form.workTime"
                          type="date"
                          :placeholder="workTimePH"
                          :disabled="form.isGraduate"
                          class="mr-10"
                          style="width:80%"
                        ></a-date-picker>
                        <a-checkbox
                          v-model="form.isGraduate"
                          @change="graduateChange"
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
                      <a-form-item prop="profession">
                        <a-checkbox-group v-model="professionValue">
                          <a-checkbox
                            v-for="(item, index) in professionList"
                            :key="'profession' + index"
                            :label="item.name"
                          ></a-checkbox>
                        </a-checkbox-group>
                      </a-form-item>
                    </div>
                  </div>
                  <div class="info-table__tr"></div>
                </div>
              </div>
            </a-form>
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
      confirmLoading,
      handleOk,
      handleCancel,
      form,
      rules,
      labelColSpan,
      wrapperColSpan
    };
  }
};
</script>

<style lang="less" scoped>
@height: calc(100vh - 270px);
.account-detail {
  &-container {
    height: @height;
  }

  &-content {
    height: @height;
    overflow-y: auto;
    padding-right: 10px;

    &__title {
      font-size: 16px;
      margin-bottom: 10px;
      font-weight: bold;
      // color: $color-primary;
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
</style>
