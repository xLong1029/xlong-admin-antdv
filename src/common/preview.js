/*
 * 模块 : 预览相关配置
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2020-11-28
 * 版本 : version 1.0
 */
import { reactive } from "vue";

export default function() {
  // 图片预览弹窗
  const imgPreviewModal = reactive({
    title: "预览图片",
    visible: false,
    imgUrl: null,
  });

  // 预览图片
  const handleImgPreview = (file) => {
    imgPreviewModal.visible = true;
    imgPreviewModal.imgUrl = file.url;
  };

  // 取消预览图片
  const handleCancelImgPreview = () => {
    imgPreviewModal.visible = false;
    imgPreviewModal.imgUrl = null;
  };

  return {
    imgPreviewModal,
    handleImgPreview,
    handleCancelImgPreview,
  };
}
