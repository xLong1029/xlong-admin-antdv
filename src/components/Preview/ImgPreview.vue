<template>
  <a-modal
    :title="title"
    :visible="visible"
    :footer="null"
    centered
    @cancel="handleCancelPreview"
    class="img-preview-container"
  >
    <img alt="preview-img" :src="imgUrl" @error="setDefaultImg" />
  </a-modal>
</template>

<script setup>
// eslint-disable-next-line
const props = defineProps({
  title: {
    type: String,
    default: "预览图片",
  },
  visible: {
    type: Boolean,
    default: false,
  },
  imgUrl: {
    type: String,
    default: "",
  },
});

// eslint-disable-next-line
const emit = defineEmits(["close"]);

const handleCancelPreview = () => {
  emit("close", false);
};

// 设置默认图片
const setDefaultImg = (e) => {
  e.currentTarget.src = require("@/assets/images/no-found-pic.jpg");
  e.currentTarget.onerror = null;
};
</script>
<style lang="less">
.img-preview-container {
  // v-deep无效， /deep有效
  /deep/ .ant-modal-body {
    text-align: center;
  }

  img {
    max-width: 100%;
  }
}
</style>
