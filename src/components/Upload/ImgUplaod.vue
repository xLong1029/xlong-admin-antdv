<template>
  <div class="clearfix">
    <a-upload
      action="customize"
      list-type="picture-card"
      :file-list="fileList"
      :custom-request="uploadImg"
      :remove="removeFile"
      @preview="handlePreview"
      @change="handleUploadChange"
    >
      <div v-if="fileList.length <= limitNum && limitNum === 1">
        <plus-outlined />
        <div class="ant-upload-text">{{ uploadBtnText }}</div>
      </div>
    </a-upload>
  </div>
</template>
<script>
import { ref } from "vue";
import { message } from "ant-design-vue";
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
  setup(props, context) {
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
          message.warning("图片只能是 png 、jpg 、gif 格式");
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
      const file = params.file;

      uploadToBomb(file)
        .then(res => {
          if (res.length) {
            context.emit("upload-success", res[0]);
          }
        })
        .catch(err => {
          console.log(err);
          context.emit("upload-fail", err);
        })
        .finally(() => (uploadLoading.value = false));
    };

    // 移除文件
    const removeFile = file => {
      let list = [...props.fileList];
      if (!list.length) return;
      const index = list.indexOf(file);
      list.splice(index, 1);
      context.emit("delete", { file, index, list });
    };

    // 预览头像
    const handlePreview = file => {
      context.emit("preview", file);
    };

    return {
      fileAccept,
      setDefaultHeadImg,
      handleUploadChange,
      handleBeforeUpload,
      uploadLoading,
      uploadImg,
      handlePreview,
      removeFile
    };
  }
};
</script>
<style>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
