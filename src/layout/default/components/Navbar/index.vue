<template>
  <!-- eslint-disable -->
  <div class="navbar-container fixed">
    <div class="wrapper-container flex">
      <div class="logo-container flex" @click="toBDC">
        <img class="logo" :src="logo" />
      </div>
      <!-- 导航 -->
      <div class="nav-list-container hidden-xs-only">
        <!-- <el-menu
          :default-active="activeMenu"
          class="nav-list"
          mode="horizontal"
          :background-color="variables.menuBg"
          :text-color="variables.menuText"
          :active-text-color="variables.menuActiveText"
        >
          <nav-item
            class="nav-list-menu"
            v-for="(route, index) in permissionRoutes"
            :key="'route.path' + index"
            :item="route"
            :base-path="route.path"
          />
        </el-menu>-->

        <a-menu v-model:selectedKeys="activeMenu" mode="horizontal">
          <!-- <a-menu-item key="mail">
            <mail-outlined />Navigation One
          </a-menu-item>
          <a-menu-item key="app" disabled>
            <appstore-outlined />Navigation Two
          </a-menu-item> -->
          <!-- <a-sub-menu>
            <template #title>
              <span class="submenu-title-wrapper">
                <setting-outlined />Navigation Three - Submenu
              </span>
            </template>
            <a-menu-item-group title="Item 1">
              <a-menu-item key="setting:1">Option 1</a-menu-item>
              <a-menu-item key="setting:2">Option 2</a-menu-item>
            </a-menu-item-group>
            <a-menu-item-group title="Item 2">
              <a-menu-item key="setting:3">Option 3</a-menu-item>
              <a-menu-item key="setting:4">Option 4</a-menu-item>
            </a-menu-item-group>
          </a-sub-menu> -->
          <!-- <a-menu-item key="alipay">
            <a
              href="https://antdv.com"
              target="_blank"
              rel="noopener noreferrer"
            >Navigation Four - Link</a>
          </a-menu-item> -->
        </a-menu>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from "vuex";
import NavItem from "./NavItem";
import variables from "@/styles/variables.less";

export default {
  name: "Navbar",
  components: { NavItem },
  computed: {
    ...mapGetters(["permissionRoutes"]),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;

      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    variables() {
      return variables;
    }
  },
  watch: {
    $route(to, form) {
      const $navListXs = $(".nav-list-xs");
      if ($navListXs) {
        $navListXs.slideUp();
      }
    }
  },
  data() {
    return {
      logo: require("@/assets/images/logo.jpg")
    };
  },
  methods: {
    toBDC() {
      window.location.href = process.env.VUE_APP_BASE_URL;
    },
    showNavListXS() {
      $(".nav-list-xs").slideToggle();
    }
  }
};
</script>

<style lang="less" scoped>
// @mixin nav-list-item-hover {
//   color: @menuActiveText !important;
//   background: transparent !important;
//   i {
//     color: @menuActiveText;
//   }
// }

// @right-menu-height: 50px;

// .navbar-container {
//   background: #ffffff;
//   width: 100%;
//   overflow: hidden;
//   padding: 10px 0;
//   border-bottom: 1px solid #ddd;

//   &.fixed {
//     position: fixed;
//     z-index: 1002; // 覆盖loading
//     top: 41px;
//     left: 0;
//   }

//   .wrapper-container {
//     justify-content: space-between;
//     align-items: center;
//   }

//   .logo-container {
//     align-items: center;
//     flex-direction: column;
//     cursor: pointer;

//     .logo {
//       height: 72px;
//     }

//     span {
//       margin-top: 3px;
//       color: #605d5c;
//     }
//   }
// }

// // 导航设置
// .nav-list {
//   &-container {
//     position: relative;

//     ::v-deep .el-menu {
//       background: transparent;
//     }

//     ::v-deep .el-menu-item {
//       height: @right-menu-height;
//       line-height: @right-menu-height;
//       font-size: 16px;
//       color: @menuText;
//       display: flex;
//       align-items: center;

//       i {
//         color: @menuText;
//       }

//       &:focus {
//         background: transparent !important;
//       }

//       &:hover {
//         @include nav-list-item-hover;
//       }
//     }

//     ::v-deep .el-submenu__title {
//       height: @right-menu-height;
//       line-height: @right-menu-height;
//       font-size: 16px;

//       i {
//         color: @menuText;
//       }
//     }

//     ::v-deep .el-menu--horizontal {
//       border-bottom: none;
//     }

//     ::v-deep .el-submenu__title {
//       color: @menuText;

//       &:focus {
//         background: transparent !important;
//       }

//       &:hover {
//         @include nav-list-item-hover;
//       }

//       span {
//         margin-right: 5px;
//       }
//       i {
//         color: @menuText;
//       }
//     }

//     ::v-deep .el-submenu__icon-arrow {
//       position: relative;
//       top: inherit;
//       right: inherit;
//       margin-top: 0;
//     }
//   }
// }

// .nav-list {
//   &-icon {
//     font-size: 22px;
//     cursor: pointer;
//     background: #333;
//     color: #fff;
//     padding: 8px;
//     border-radius: 4px;
//     display: flex;
//     align-items: center;

//     &:hover {
//       background: @primary-color;
//     }
//   }

//   &-xs {
//     display: none;
//     width: 100%;
//     position: fixed;
//     left: 0;
//     top: 112px;
//   }
// }

// @media screen and (max-width: 768px) {
//   .navbar-container {
//     .logo-container {
//       .logo {
//         height: 50px;
//       }
//     }
//   }
// }
</style>
