<template>
  <a-sub-menu @click.capture="handleLink(item)">
    <template #title>
      <span>{{ item.meta.title }}</span>
    </template>
    <slot />
  </a-sub-menu>
</template>

<script>
import { getCurrentInstance } from "vue";

export default {
  name: "Submenu",
  props: {
    item: {
      type: Object,
      default() {
        return null;
      }
    }
  },
  setup() {
    const { ctx } = getCurrentInstance();

    const handleLink = item => {
      if (!item.meta.directLink) return;
      ctx.$router.push({ path: item.path });
    };
    return {
      handleLink
    };
  }
};
</script>
