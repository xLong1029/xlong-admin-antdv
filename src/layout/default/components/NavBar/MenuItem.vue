<template>
  <a-menu-item @click.capture="handleLink">
    {{ item }}
    <i v-if="item.meta.icon" :class="item.meta.icon" class="mr-5"></i>
    <span>{{ item.meta.title }}</span>
  </a-menu-item>
</template>

<script>
import { useRouter } from "vue-router";
import { isExternal } from "utils/validate";
export default {
  name: "MenuItem",
  props: {
    item: {
      type: Object,
      default() {
        return null;
      }
    },
    url: {
      type: String,
      default: ""
    }
  },
  setup(props) {
    const router = useRouter();

    const handleLink = () => {
      const url = props.url;
      if (isExternal(url)) {
        window.open(url);
      } else {
        router.push({ path: url });
      }
    };
    return {
      handleLink
    };
  }
};
</script>
