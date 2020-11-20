<template>
  <a-menu-item @click.capture="handleLink">
    <i v-if="item.meta.icon" :class="item.meta.icon" class="mr-5"></i>
    <span>{{ item.meta.title }}</span>
  </a-menu-item>
</template>

<script>
import { getCurrentInstance } from "vue";
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
    const { ctx } = getCurrentInstance();

    const handleLink = () => {
      const url = props.url;
      if (isExternal(url)) {
        window.open(url);
      } else {
        ctx.$router.push({ path: url });
      }
    };
    return {
      handleLink
    };
  }
};
</script>
