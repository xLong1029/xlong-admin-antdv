<template>
  <a-menu-item
    v-if="menuComponent === 'MenuItem'"
    :key="currentItem.name"
    @click.capture="handleLink(resolvePath(currentItem.path))"
  >
    <template v-if="currentItem.meta">
      <i
        v-if="currentItem.meta.icon"
        :class="currentItem.meta.icon"
        class="mr-5"
      ></i>
      <span>{{ currentItem.meta.title }}</span>
    </template>
  </a-menu-item>

  <a-sub-menu
    v-if="menuComponent === 'Submenu'"
    :key="currentItem.name"
    @click.capture="handleLink(resolvePath(currentItem.path))"
  >
    <template #title>

        <i
          v-if="currentItem.meta.icon"
          :class="currentItem.meta.icon"
          class="mr-5"
        ></i>
        <span>{{ currentItem.meta.title }}</span>
      <!-- </template> -->
    </template>
      <NavItem
      v-for="route in currentItem.children"
      :key="route.path"
      :item="route"
      :base-path="resolvePath(route.path)"
    />
  </a-sub-menu>

  <!-- <component
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
  </component> -->
</template>



<script setup>
import { watch, shallowRef, ref, onMounted } from "vue";
import path from "path";
import { isExternal } from "@/utils/validate";
import MenuItem from "./MenuItem.vue";
import Submenu from "./Submenu.vue";
import { useRouter } from "vue-router";

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

const router = useRouter();

const handleLink = (url) => {
  if (isExternal(url)) {
    window.open(url);
  } else {
    router.push({ path: url });
  }
};

const menuComponent = ref("MenuItem");
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

const isHidden = (item) => {
  // console.log(item.name, Object.keys(item).includes("hidden"));

  return Object.keys(item).includes("hidden") && item.hidden;
};

// 通过判断获取当前菜单组件
const getComponent = (children = [], parent) => {
  if (!children || !children.length) {
    currentItem.value = { ...parent, path: "", noShowingChildren: true };
    return "MenuItem";
  }

  console.log(children);

  const showingChildren = children.filter((item) => {
    if (isHidden(item)) {
      return false;
    } else {
      currentItem.value = item;
      return true;
    }
  });

  console.log(222, showingChildren, showingChildren.length, currentItem.value);

  if (showingChildren.length === 1) {
    return "MenuItem";
  }

  if (showingChildren.length === 0) {
    currentItem.value = { ...parent, noShowingChildren: true };
    // console.log(333, currentItem.value);
    return "MenuItem";
  }
  currentItem.value = { ...parent };

  return "Submenu";
};

onMounted(() => {
  menuComponent.value = getComponent(props.item.children, props.item);
  // console.log(menuComponent.value);
});
</script>
