<template>
  <a-menu-item @click.capture="handleLink">
    <i v-if="item.meta.icon" :class="item.meta.icon" class="mr-5"></i>
    <span>{{ item.meta.title }}</span>
  </a-menu-item>
</template>

<script setup>
import { useRouter } from "vue-router";
import { isExternal } from "utils/validate";

// eslint-disable-next-line
const props = defineProps({
  item: {
    type: Object,
    default() {
      return null;
    },
  },
  url: {
    type: String,
    default: "",
  },
});

const router = useRouter();

const handleLink = () => {
  const url = props.url;
  if (isExternal(url)) {
    window.open(url);
  } else {
    router.push({ path: url });
  }
};
</script>
