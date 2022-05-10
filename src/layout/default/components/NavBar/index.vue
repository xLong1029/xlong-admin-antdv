<template>
  <div class="navbar-container fixed">
    <div class="wrapper-container flex">
      <div class="logo-container" @click="toPage('/home')">
        <img class="logo" :src="logo" />
      </div>
      <!-- 导航 -->
      <div class="nav-list-container ml-20">
        <a-menu v-model:selectedKeys="currentMenu" mode="horizontal">
          <NavItem
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

<script setup>
import { ref, computed, watch } from "vue";
import useCommon from "common";
import NavItem from "./NavItem";

const { toPage, router, store } = useCommon();

    // 监听路由变化
    watch(
      () => router.currentRoute.value,
      (val) => {
        currentMenu.value = getActiveMenu();
      }
    );

    const logo = require("@/assets/images/logo.jpg");

    const permissionRoutes = computed(() => store.getters.permissionRoutes);

    const currentMenu = ref([]);

    // 获取当前激活菜单
    const getActiveMenu = () => {
      const route = router.currentRoute.value;
      const { meta, matched, path } = route;

      if (meta.activeMenu) {
        return [meta.activeMenu];
      }

      return matched[0].children.length > 1 ? [path] : [matched[0].path];
    };

    currentMenu.value = getActiveMenu();
</script>

<style lang="less" scoped>
.navbar-container {
  padding: 15px 0;

  .wrapper-container {
    justify-content: space-between;
  }

  ::v-deep(.ant-menu-horizontal) {
    border-bottom: none;
  }
}

// .nav-list-container{
//   width: 100%;
// }

.logo {
  width: 150px;
  cursor: pointer;
}

@media only screen and (max-width: 767px) {
  .nav-list-container {
    width: 100%;
  }
}
</style>
