<template>
  <div class="user-info-container">
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
      <a-form-item label="头像" name="avatar" class="mb-0">
        <img-upload
          :file-list="form.avatar"
          upload-btn-text="上传头像"
          :limit-num="1"
          @delete="handleUploadImgDelete"
          @upload-success="handleUploadSuccess"
          @preview="handleImgPreview"
        />
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
        <a-button type="primary" @click="onSubmit" :loading="submitLoading"
          >提交修改</a-button
        >
      </a-form-item>
    </a-form>
    <img-preview
      :title="imgPreviewModal.title"
      :visible="imgPreviewModal.visible"
      :imgUrl="imgPreviewModal.imgUrl"
      @close="handleCancelImgPreview"
    />
  </div>
</template>

<script setup>
import { reactive, toRaw, ref, computed, onMounted } from "vue";
import { message } from "ant-design-vue";
// Api
import Api from "api/user";
// 工具
import { strToArr } from "utils";
// 组件
import ImgUpload from "components/Upload/ImgUplaod.vue";
import ImgPreview from "components/Preview/ImgPreview.vue";
// 通用方法
import usePreview from "common/preview.js";
import useCommon from "common";

const { store, setPageLoding } = useCommon();

const { imgPreviewModal, handleImgPreview, handleCancelImgPreview } =
  usePreview();

// 表单配置
const labelColSpan = 6;
const wrapperColSpan = 18;

// 当前用户信息和系统配置
const token = computed(() => store.getters.token);

const userId = computed(() => store.getters.userId);

// 表单
const form = reactive({
  username: null,
  avatar: [],
  nickName: null,
  realName: null,
  gender: null,
});

// 表单规则
const rules = reactive({
  nickName: [{ required: true, message: "请输入昵称", trigger: "blur" }],
  realName: [{ required: true, message: "请输入真实姓名", trigger: "blur" }],
  gender: [{ required: true, message: "请选择性别", trigger: "change" }],
});

// 提交loading
const submitLoading = ref(false);

const submitForm = ref(null);

// 头像上传成功
const handleUploadSuccess = (file) => {
  // 多图片上传时
  const length = form.avatar.length;
  file.uid = length ? form.avatar[length - 1].uid++ : 1; // 解决浏览器报警告“<TransitionGroup> children must be keyed. ”
  form.avatar = [file];
};

// 删除上传的图片
const handleUploadImgDelete = ({ file, index, list }) => {
  // console.log(file, index);
  form.avatar = list;
};

// 获取个人资料
const getProfile = () => {
  setPageLoding(true);
  Api.GetUser()
    .then((res) => {
      const { code, data, message: msg } = res;
      // 获取到数据
      if (code == 200) {
        for (let i in data) {
          form[i] = data[i];
        }
        form.avatar = [
          {
            uid: 1, // 解决浏览器报警告“<TransitionGroup> children must be keyed. ”
            url: data.avatar,
          },
        ];

        data.roles = data.roles ? strToArr(data.roles, ",") : null;

        // 更新用户信息
        store.commit("user/SET_USER", { ...data });
      } else message.error(msg);
    })
    .catch((err) => console.log(err))
    .finally(() => setPageLoding(false));
};

// 提交修改
const onSubmit = () => {
  submitForm.value
    .validate()
    .then(() => {
      submitLoading.value = true;
      const data = toRaw(form);

      let params = { ...data };

      params.avatar = data.avatar.length ? data.avatar[0].url : null;

      Api.EditProfile(params, userId.value)
        .then((res) => {
          const { code } = res;
          if (code == 200) {
            getProfile();
            message.success("资料修改成功！");
          } else message.error("资料修改失败！");
        })
        .catch((err) => console.log(err))
        .finally(() => (submitLoading.value = false));
    })
    .catch((err) => {
      console.log("error", err);
    });
};

// 初始化
onMounted(() => {
  getProfile();
});
</script>
<style lang="less" scoped>
.user-info-container {
  padding: 40px 0;
  width: 500px;
  margin: auto;
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
</style>
