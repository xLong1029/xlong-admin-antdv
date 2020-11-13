<template>
  <!-- eslint-disable -->
  <div v-if="!item.hidden">
    <!-- {{ item }} -->
    <div
      v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow"
      class="nav-list__item"
      :class="{ right: item.right }"
    >
      <!-- <app-link v-if="onlyOneChild.meta" :key="onlyOneChild.name" :to="resolvePath(onlyOneChild.path)"> -->
        <a-menu-item :key="onlyOneChild.name" :class="{'submenu-title-noDropdown':!isNest}">
          <span>{{ onlyOneChild.meta.title }}</span>
        </a-menu-item>
      <!-- </app-link> -->
    </div>

    <!-- <el-submenu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
      class="nav-list__item"
      :class="{ 'right': item.right }"
    >
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <nav-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>-->
  </div>
</template>

<script>
/* eslint-disable */
import path from "path";
import { isExternal } from "@/utils/validate";
import AppLink from "./Link";

export default {
  name: "NavItem",
  components: { AppLink },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ""
    }
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null;
    return {};
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      if (!children || !children.length) {
        this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        return true;
      }

      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false;
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item;
          return true;
        }
      });

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true;
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        return true;
      }

      return false;
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.basePath)) {
        return this.basePath;
      }
      return path.resolve(this.basePath, routePath);
    }
  }
};
</script>
