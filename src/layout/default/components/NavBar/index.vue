<template>
  <div class="navbar-container fixed">
    <div class="wrapper-container flex">
      <div class="logo-container" @click="toPage('/home')">
        <!-- <img class="logo" :src="logo" /> -->
      </div>
      <!-- 导航 -->
      <div class="nav-list-container">
        <a-menu v-model:selectedKeys="currentMenu" mode="horizontal">
          <nav-item
            v-for="route in permissionRoutes"
            :key="route.path"
            :item="route"
            :base-path="route.path"
          />
        </a-menu>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { ref, computed, watch, getCurrentInstance } from "vue";
import common from "common";
import NavItem from "./NavItem";

export default {
  name: "AppNavBar",
  components: { NavItem },
  setup() {
    const { ctx } = getCurrentInstance();

    const { toPage } = common();

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

    // 监听路由变化
    watch(
      () => ctx.$router.currentRoute.value,
      val => {
        currentMenu.value = getActiveMenu();
      }
    );

    //  watch(
    //   () => currentMenu.value,
    //   val => {
    //     console.log(val);
    //   }
    // );

    return {
      logo,
      permissionRoutes,
      currentMenu,
      toPage
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

// .nav-list-container{
//   width: 100%;
// }

.logo {
  width: 150px;
  cursor: pointer;
}

.ant-menu-horizontal {
  border-bottom: none;
}

@media only screen and (max-width: 767px) {
    .nav-list-container {
        width: 100%;
    }
}
</style>
