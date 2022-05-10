<template>
  <a-sub-menu @click.capture="handleLink(item)">
    <!-- 333 -->
    <template #title>
      <i v-if="item.meta.icon" :class="item.meta.icon" class="mr-5"></i>
      <span>{{ item.meta.title }}</span>
    </template>
    <slot />
  </a-sub-menu>
</template>

<script setup>
import { useRouter } from "vue-router";

// eslint-disable-next-line
const props = defineProps({
  item: {
    type: Object,
    default() {
      return null;
    },
  },
});

const router = useRouter();

const handleLink = (item) => {
  if (!item.meta.directLink) return;
  router.push({ path: item.path });
};
</script>
