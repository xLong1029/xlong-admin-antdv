/*
 * 模块 : 上传相关配置
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2020-11-27
 * 版本 : version 1.0
 */
import { ref } from "vue";
import { message } from "ant-design-vue";
import { Random } from "mockjs";

export default function() {
  // 默认图片
  const defaultImg = require("@/assets/images/no-found-pic.jpg");

  // 上文文件
  const fileList = ref([]);

  // 文件上传格式
  const fileAccept = ref(".png,.jpg,.jpeg,.gif");

  // 限制文件大小(单位从kb开始计算)
  const limitFileSize = ref(100);

  /**
   * 设置默认图片
   *
   * @param {*} e 当前节点
   */
  const setDefaultImg = e => {
    e.currentTarget.src = this.defaultImg;
    e.currentTarget.onerror = null;
  };

  /**
   * 获取文件大小文本
   *
   * @param {*} e fileSize 文件大小
   */
  const getSizeText = fileSize => {
    if (fileSize < 1) return `${Math.floor(fileSize * 1024 * 100) / 100}B`;
    return fileSize >= 1024
      ? fileSize / 1024 >= 1024
        ? `${Math.floor((fileSize / 1024 / 1024) * 100) / 100}GB`
        : `${Math.floor((fileSize / 1024) * 100) / 100}MB`
      : `${Math.floor(fileSize * 100) / 100}KB`;
  };

  /**
   * 上传前
   *
   * @param {*} file 文件
   */
  const beforeUpload = (file, onCheckFormat) => {
    if (file.name.length > 100) {
      message.warning(`文件名称过长，请修改后重新上传`);
      return false;
    }

    const format = onCheckFormat(file);
    if (!format) return false;

    // 控制文件大小
    if (file.size / 1024 > limitFileSize.value) {
      message.warning(`文件大小不能超过${getSizeText(limitFileSize.value)}`);
      return false;
    }

    return true;
  };

  /**
   * 上传文件（模拟）
   *
   * @param {*} file 文件
   */
   const uploadFileDemo = file => {
    return new Promise((resolve) => {
      const { name, size, type } = file;

      // 转bse64
      let reader = new FileReader();
      reader.readAsDataURL(file); // 这里也可以直接写参数event.raw
      reader.onload = () => {
        const url = reader.result;
        const data = {
          name,
          size,
          type,
          urlType: "base64",
          url,
          uid:Random.guid()
        };
        const res = { code: 200, data, mesaage: "上传成功" };
        resolve(res);
      };
    });
  };


  return {
    defaultImg,
    fileList,
    fileAccept,
    setDefaultImg,
    getSizeText,
    beforeUpload,
    uploadFileDemo
  };
}
