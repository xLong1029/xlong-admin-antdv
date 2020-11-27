<template>
  <a-upload
    action="customize"
    list-type="picture-card"
    :accept="fileAccept"
    :custom-request="uploadImg"
    @preview="handlePreview"
    @change="handleUploadChange"
  >
    <div v-if="fileList.length < limitNum">
      <plus-outlined />
      <div class="ant-upload-text">{{ uploadBtnText }}</div>
    </div>
  </a-upload>
</template>

<script>
import { getCurrentInstance, ref } from "vue";
import upload from "common/upload.js";

export default {
  name: "ImgUpload",
  props: {
    uploadBtnText: {
      type: String,
      default: "上传图片"
    },
    fileList: {
      type: Array,
      default: () => []
    },
    limitNum: {
      type: Number,
      default: 8
    }
  },
  setup() {
    const { ctx } = getCurrentInstance();

    const { fileAccept, beforeUpload, uploadToBomb } = upload();

    // 默认头像
    const defaultFaceImg = require("@/assets/images/head.jpg");

    // 设置默认头像
    const setDefaultHeadImg = e => {
      e.currentTarget.src = defaultFaceImg.value;
      e.currentTarget.onerror = null;
    };

    // 头像上传前
    const handleBeforeUpload = file => {
      return beforeUpload(file, function(file) {
        // 双重检查，避免在“所有文件”中选择其他文件
        if (
          !(
            file.type === "image/jpeg" ||
            file.type === "image/png" ||
            file.type === "image/gif"
          )
        ) {
          ctx.$message.warning("图片只能是 png 、jpg 、gif 格式");
          return false;
        }
        return true;
      });
    };

    const uploadLoading = ref(false);

    // 上传状态改变
    const handleUploadChange = info => {
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

    // 上传图片
    const uploadImg = params => {
      // console.log("uploadFile", params);
      const file = params.file;

      uploadToBomb(file)
        .then(res => {
          if (res.length) {
            ctx.$emit("upload-success", file);
          }
        })
        .catch(err => {
          console.log(err);
          ctx.$emit("upload-fail", err);
        })
        .finally(() => (uploadLoading.value = false));
    };

    // 预览头像
    const handlePreview = file => {
      console.log(file);
      // ctx.$emit("preview", file);
    };

    return {
      fileAccept,
      setDefaultHeadImg,
      handleUploadChange,
      handleBeforeUpload,
      uploadLoading,
      uploadImg,
      handlePreview
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
