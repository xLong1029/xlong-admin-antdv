<template>
  <!-- eslint-disable -->
  <component v-if="!currentItem.hidden" :is="menuComponent" :item="currentItem" :url="resolvePath(currentItem.path)">
    <template v-if="currentItem.children && currentItem.children.length">
      <nav-item
        v-for="route in currentItem.children"
        :key="resolvePath(route.path)"
        :item="route"
        :base-path="resolvePath(route.path)"
      />
    </template>
  </component>
</template>

<script>
/* eslint-disable */
import { getCurrentInstance, ref } from "vue";
import path from "path";
import { isExternal } from "@/utils/validate";
import MenuItem from "./MenuItem";
import Submenu from "./Submenu";

export default {
  name: "NavItem",
  components: { MenuItem, Submenu },
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ""
    }
  },
  setup(props) {
    const { ctx } = getCurrentInstance();

    let currentItem = ref(null);

    const resolvePath = (routePath) => {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(props.basePath)) {
        return props.basePath;
      }
      return path.resolve(props.basePath, routePath);
    }

    // 通过判断获取当前菜单组件
    const getComponent = (children = [], parent) => {
      // console.log(children, parent);

      if (!children || !children.length) {
        currentItem.value = { ...parent, path: "", noShowingChildren: true };
        return "MenuItem";
      }

      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false;
        } else {
          currentItem.value = item;
          return true;
        }
      });

      if (showingChildren.length === 1) {
        return "MenuItem";
      }

      if (showingChildren.length === 0) {
        currentItem.value = { ...parent , noShowingChildren: true };
        return "MenuItem";
      }
      currentItem.value = { ...parent};

      return "Submenu";
    };

    const menuComponent = getComponent(props.item.children, props.item);

    return {
      menuComponent,
      resolvePath,
      currentItem
    };
  }
};
</script>
