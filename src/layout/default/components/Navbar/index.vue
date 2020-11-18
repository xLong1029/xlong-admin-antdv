<template>
  <!-- eslint-disable -->
  <div class="navbar-container fixed">
    <div class="wrapper-container flex">
      <div class="logo-container" @click="onToPage('/home')">
        <img class="logo" :src="logo" />
      </div>
      <!-- 导航 -->
      <div class="nav-list-container">
        <a-menu v-model:selectedKeys="currentMenu" mode="horizontal">
          <!-- <a-menu-item v-for="route in permissionRoutes" :key="route.path">{{ route.path }}</a-menu-item> -->
          <!-- <div v-for="(route, index) in permissionRoutes" :key="index">{{ route}}</div> -->
          <nav-item
            v-for="route in permissionRoutes"
            :key="route.path"
            :item="route"
            :base-path="route.path"
          >{{ route }}</nav-item>
        </a-menu>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { ref, computed, watch, getCurrentInstance } from "vue";
import common from "common/index.js";
import NavItem from "./NavItem";

export default {
  name: "AppNavBar",
  components: { NavItem },
  setup() {
    const { ctx } = getCurrentInstance();

    const logo = require("@/assets/images/logo.jpg");

    const permissionRoutes = computed(
      () => ctx.$store.getters.permissionRoutes
    );

    const currentMenu = ref([]);

    // 获取当前激活菜单
    const getActiveMenu = () => {
      const route = ctx.$router.currentRoute.value;
      const { meta, matched, path } = route;

      if (meta.activeMenu) {
        return [meta.activeMenu];
      }

      return matched[0].children.length > 1 ? [path] : [matched[0].path];
    };

    currentMenu.value = getActiveMenu();

    const onToPage = path => {
      ctx.$router.push({ path });
    };

    return {
      logo,
      permissionRoutes,
      currentMenu,
      onToPage
    };
  }
};
</script>

<style lang="less" scoped>
.navbar-container {
  padding: 15px 0;

  .wrapper-container {
    justify-content: space-between;
  }
}

.logo {
  width: 150px;
  cursor: pointer;
}

/deep/ .ant-menu-horizontal {
  border-bottom: none;
}
</style>
