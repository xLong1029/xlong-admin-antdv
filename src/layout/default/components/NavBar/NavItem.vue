<template>
  <component
    v-if="!currentItem.hidden"
    :is="menuComponent"
    :item="currentItem"
    :url="resolvePath(currentItem.path)"
  >
    <template v-if="currentItem.children && currentItem.children.length">
      <NavItem
        v-for="route in currentItem.children"
        :key="resolvePath(route.path)"
        :item="route"
        :base-path="resolvePath(route.path)"
      />
    </template>
  </component>
</template>



<script setup>
import { watch, shallowRef, ref, onMounted } from "vue";
import path from "path";
import { isExternal } from "@/utils/validate";
import MenuItem from "./MenuItem.vue";
import Submenu from "./Submenu.vue";

// eslint-disable-next-line
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  basePath: {
    type: String,
    default: "",
  },
});

const menuComponent = shallowRef(MenuItem);
const currentItem = ref({
  hidden: true,
});

const resolvePath = (routePath) => {
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(props.basePath)) {
    return props.basePath;
  }
  return path.resolve(props.basePath, routePath);
};

// 通过判断获取当前菜单组件
const getComponent = (children = [], parent) => {
  if (!children || !children.length) {
    currentItem.value = { ...parent, path: "", noShowingChildren: true };
    return MenuItem;
  }

  const showingChildren = children.filter((item) => {
    if (item.hidden) {
      return false;
    } else {
      currentItem.value = item;
      return true;
    }
  });

  if (showingChildren.length === 1) {
    return MenuItem;
  }

  if (showingChildren.length === 0) {
    currentItem.value = { ...parent, noShowingChildren: true };
    // console.log(333, currentItem.value);
    return MenuItem;
  }
  currentItem.value = { ...parent };

  return Submenu;
};

onMounted(() => {
  menuComponent.value = getComponent(props.item.children, props.item);
  // console.log(menuComponent.value);
});
</script>
