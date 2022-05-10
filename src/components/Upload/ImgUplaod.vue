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

<script setup>
import { ref } from "vue";
import { message } from "ant-design-vue";
import useUpload from "common/upload.js";

// eslint-disable-next-line
const props = defineProps({
  uploadBtnText: {
    type: String,
    default: "上传图片",
  },
  fileList: {
    type: Array,
    default: () => [],
  },
  limitNum: {
    type: Number,
    default: 8,
  },
});

// eslint-disable-next-line
const emit = defineEmits(["upload-success", "upload-fail", "delete", "preview"]);

const { beforeUpload, uploadFileDemo } = useUpload();

// 默认头像
const defaultFaceImg = require("@/assets/images/head.jpg");

// 设置默认头像
const setDefaultHeadImg = (e) => {
  e.currentTarget.src = defaultFaceImg.value;
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

// 上传图片
const uploadImg = (params) => {
  const file = params.file;

  uploadFileDemo(file)
    .then((res) => {
      emit("upload-success", res.data);
    })
    .catch((err) => {
      console.log(err);
      emit("upload-fail", err);
    })
    .finally(() => (uploadLoading.value = false));
};

// 移除文件
const removeFile = (file) => {
  let list = [...props.fileList];
  if (!list.length) return;
  const index = list.indexOf(file);
  list.splice(index, 1);
  emit("delete", { file, index, list });
};

// 预览头像
const handlePreview = (file) => {
  emit("preview", file);
};
</script>

<style>
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
