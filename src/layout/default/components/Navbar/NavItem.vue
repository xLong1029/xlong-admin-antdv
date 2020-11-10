<template>
  <!-- eslint-disable -->
  <div v-if="!item.hidden">
    <div
      v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow"
      class="nav-list-menu__item"
      :class="{ 'right': item.right }"
    >
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{'submenu-title-noDropdown':!isNest}"
        >
          <item
            :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)"
            :title="onlyOneChild.meta.title"
          />
        </el-menu-item>
      </app-link>
    </div>

    <el-submenu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
      @click.native="toPath(item)"
      class="nav-list-menu__item"
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
        class="nav-list-submenu"
      />
    </el-submenu>
  </div>
</template>

<script>
/* eslint-disable */
import path from "path";
import { isExternal } from "@/utils/validate";
import Item from "./Item";
import AppLink from "./Link";

export default {
  name: "NavItem",
  components: { Item, AppLink },
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
    },
    toPath(item) {
      if (!item.meta.directLink) return;
      this.$router.push({ path: item.path });
    }
  }
};
</script>

<style lang="less">
@mixin nav-list-item-lighthight {
  i {
    font-weight: normal !important;
    color: @menuActiveText !important;
  }
  span {
    color: @menuActiveText;
  }
}

.nav-list {
  &-container {
    .nav-list {
      > div {
        float: left;
      }
      &__item {
        float: left;

        &.right {
          float: right;
        }
      }
    }
  }

  // 一级菜单高亮设置
  &-menu {
    .nav-list-menu__item {
      // 无下拉框一级菜单高亮
      .el-menu-item.is-active {
        @include nav-list-item-lighthight;
      }

      &.is-active {
        @include nav-list-item-lighthight;
      }
    }
  }

  // 二级菜单样式设置
  &-submenu {
    .nav-list-menu__item {
      .el-menu-item {
        background: #2e363f;

        &.is-active{
          color: @subMenuActiveText !important;
        }
      }

      // 二级菜单高亮
      &.is-active{
        .el-submenu__title{
          color: @subMenuActiveText !important;
          background: #1b1f23 !important;
        }
      }
    }
  }
}
</style>
