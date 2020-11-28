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
      <a-form-item label="头像" name="userFace" class="mb-0">
        <img-upload
          :file-list="form.userFace"
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

<script>
import {
  getCurrentInstance,
  reactive,
  toRaw,
  ref,
  computed,
  onMounted,
} from "vue";
// Api
import Api from "api/user";
// 工具
import { strToArr } from "utils";
// 组件
import ImgUpload from "components/Upload/ImgUplaod.vue";
import ImgPreview from "components/Preview/ImgPreview.vue";
// 通用方法
import preview from "common/preview.js";

export default {
  name: "UserInfo",
  components: { ImgUpload, ImgPreview },
  setup() {
    const { ctx } = getCurrentInstance();

    // 表单配置
    const labelColSpan = 6;
    const wrapperColSpan = 18;

    // 当前用户信息和系统配置
    const token = computed(() => ctx.$store.getters.token);
    const pageLoading = computed(() => ctx.$store.getters.pageLoading);
    const userId = computed(() => ctx.$store.getters.userId);

    // 表单
    const form = reactive({
      username: null,
      userFace: [],
      nickName: null,
      realName: null,
      gender: null,
    });

    // 表单规则
    const rules = reactive({
      nickName: [{ required: true, message: "请输入昵称", trigger: "blur" }],
      realName: [
        { required: true, message: "请输入真实姓名", trigger: "blur" },
      ],
      gender: [{ required: true, message: "请选择性别", trigger: "change" }],
    });

    // 设置页面加载Loading
    const setPageLoding = (val) => {
      ctx.$store.dispatch("app/setPageLoading", val);
    };

    // 头像上传成功
    const handleUploadSuccess = (file) => {
      // 多图片上传时
      const length = form.userFace.length;
      file.uid = length ? form.userFace[length - 1].uid++ : 1; // 解决浏览器报警告“<TransitionGroup> children must be keyed. ”
      form.userFace = [file];
    };

    // 删除上传的图片
    const handleUploadImgDelete = ({ file, index, list }) => {
      form.userFace = list;
    };

    const {
      imgPreviewModal,
      handleImgPreview,
      handleCancelImgPreview,
    } = preview();

    // 获取个人资料
    const getProfile = () => {
      setPageLoding(true);
      Api.GetUser(token.value)
        .then((res) => {
          const { code, data } = res;
          // 获取到数据
          if (code == 200) {
            const {
              username,
              userFace,
              nickName,
              realName,
              gender,
              objectId,
              role,
            } = data;

            form.username = username;
            form.userFace = userFace
              ? [
                  {
                    uid: 1,
                    url: userFace,
                  },
                ]
              : [];

            console.log(form.userFace);
            form.nickName = nickName;
            form.realName = realName;
            form.gender = gender;

            // 更新用户信息
            ctx.$store.commit("user/SET_USER", {
              id: objectId,
              avatar: userFace ? userFace : null,
              gender,
              username,
              realName,
              nickName,
              userId: objectId,
              roles: role ? strToArr(role, ",") : null,
            });
          } else {
            ctx.$message.error("无法获取用户数据!");
            console.log("无该用户");
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setPageLoding(false));
    };

    // 提交loding
    const submitLoading = ref(false);

    // 提交修改
    const onSubmit = () => {
      ctx.$refs.submitForm
        .validate()
        .then(() => {
          submitLoading.value = true;
          const data = toRaw(form);

          let params = { ...data };

          params.userFace = data.userFace.length ? data.userFace[0].url : null;

          Api.EditProfile(params, userId.value)
            .then((res) => {
              if (res.code == 200) {
                getProfile();
                ctx.$message.success("资料修改成功！");
              } else ctx.$message.error("资料修改失败！");
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

    return {
      labelColSpan,
      wrapperColSpan,
      form,
      rules,
      submitLoading,
      pageLoading,
      onSubmit,
      imgPreviewModal,
      handleImgPreview,
      handleCancelImgPreview,
      handleUploadSuccess,
      handleUploadImgDelete,
    };
  },
};
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
