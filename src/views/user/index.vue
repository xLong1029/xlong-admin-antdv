<template>
  <div class="user-center-container">
    <a-alert
      v-if="alertVisible"
      :message="`尊敬的${realName}：`"
      :description="
        `您好！欢迎您使用${systemTitle}，我们将在这里为您提供便捷的在线服务。`
      "
      type="info"
      closable
      show-icon
      :after-close="handleAlertClose"
    >
      <template #icon>
        <smile-outlined />
      </template>
    </a-alert>
  </div>
</template>

<script>
import { getCurrentInstance, computed, ref } from "vue";

export default {
  name: "UserCenter",
  setup() {
    const { ctx } = getCurrentInstance();

    const systemTitle = process.env.VUE_APP_SYSYTEM_TITLE;

    const realName = computed(() => ctx.$store.getters.realName);

    const alertVisible = ref(true);

    const handleAlertClose = () => {
      alertVisible.value = false;
    };

    return {
      realName,
      systemTitle,
      alertVisible,
      handleAlertClose
    };
  }
};
</script>
<style lang="less" scoped>
.user-center-container {
  padding: 20px 0;
}
</style>
