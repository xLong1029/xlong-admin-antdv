<template>
  <!-- eslint-disable -->
  <div class="navbar-container fixed">
    <div class="wrapper-container flex">
      <div class="logo-container" @click="toPage('Home')">
        <img class="logo" :src="logo" />
      </div>
      <!-- 导航 -->
      <div class="nav-list-container">
        <a-menu v-model:selectedKeys="currentMenu" mode="horizontal">
          <a-menu-item v-for="route in permissionRoutes" :key="route.name">{{ route.meta.title }}</a-menu-item>
        </a-menu>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { ref, computed, watch, getCurrentInstance } from "vue";
import common from "common/index.js";
// import NavItem from "./NavItem";

export default {
  name: "Navbar",
  // components: { NavItem },
  setup() {
    const logo = require("@/assets/images/logo.jpg");
    const { toPage } = common();

    let currentMenu = ref([]);

    const { ctx } = getCurrentInstance();

    let activeMenu = computed(() => {
      const route = ctx.$router.currentRoute.value;
      const { meta, name } = route;

      if (meta.activeMenu) {
        return [meta.activeMenu];
      }
      return [name];
    });

    watch(
      () => activeMenu.value,
      val => {
        console.log(`activeMenu is ${val}`);
      }
    );

    let permissionRoutes = computed(() => ctx.$store.getters.permissionRoutes);

    console.log(ctx.$store.getters, permissionRoutes);

    return {
      logo,
      toPage,
      currentMenu,
      activeMenu,
      permissionRoutes
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
</style>
