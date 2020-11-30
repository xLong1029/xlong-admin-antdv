<template>
  <a-sub-menu @click.capture="handleLink(item)">
    <template #title>
      <i v-if="item.meta.icon" :class="item.meta.icon" class="mr-5"></i>
      <span>{{ item.meta.title }}</span>
    </template>
    <slot />
  </a-sub-menu>
</template>

<script>
import { useRouter } from "vue-router";

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
    const router = useRouter();

    const handleLink = item => {
      if (!item.meta.directLink) return;
      router.push({ path: item.path });
    };
    return {
      handleLink
    };
  }
};
</script>
